const { Contribution } = require('../../Models/Contributions');
const redisClient = require('../../config/redis');

const getAllConfirmedContributions = async () => {
  const contributionList = await Contribution.aggregate([
    {
      $match: {
        status: {
          $in: [110, 111],
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user_email',
        foreignField: 'user_email',
        as: 'user_info',
      },
    },
    {
      $project: {
        contribution_id: 1,
        contribution_keyword: 1,
        contribution_title: 1,
        contribution_url: 1,
        contribution_content: 1,
        contribution_date: 1,
        status: 1,
        hit: 1,
        user_name: { $arrayElemAt: ['$user_info.user_name', 0] },
        _id: 0,
      },
    },
    {
      $sort: {
        contribution_date: -1,
      },
    },
  ]);

  return contributionList;
};

const setNewCacheForContributions = async (contributions) => {
  for (let i = 0; i < contributions.length; i++) {
    let id = contributions[i].contribution_id;
    await redisClient.hset(
      'allContributions',
      id,
      JSON.stringify(contributions[i])
    );
  }
  await redisClient.expire('allContributions', 30); //TODO: 배포 전에 24시간으로 설정
};

const checkCacheForContributions = async () => {
  return new Promise((resolve, reject) => {
    redisClient.hgetall('allContributions', async (err, contributions) => {
      if (err) {
        reject(err);
      }

      // cache miss
      if (!contributions) {
        const contributionListFromDB = await getAllConfirmedContributions();
        await setNewCacheForContributions(contributionListFromDB);
        resolve({
          contributionData: contributionListFromDB,
          contributionSource: 'DB',
        });
      }

      // cache hit
      if (contributions) {
        let contributionData = [];
        for (let key in contributions) {
          contributionData.push(JSON.parse(contributions[key]));
        }
        contributionData.sort((a, b) => {
          return new Date(b.contribution_date) - new Date(a.contribution_date);
        });
        resolve({
          contributionData,
          contributionSource: 'cache',
        });
      }
    });
  });
};

const checkCacheForOneContribution = async (id) => {
  return new Promise((resolve, reject) => {
    redisClient.hgetall('allContributions', async (err, contributions) => {
      if (err) {
        reject(err);
      }

      // cache miss
      if (!contributions) {
        const contributionListFromDB = await getAllConfirmedContributions();
        await setNewCacheForContributions(contributionListFromDB);
      }

      // cache hit
      redisClient.hget('allContributions', id, async (err, contribution) => {
        if (err) {
          reject(err);
        }

        if (!contribution) {
          resolve('Not found');
        }

        if (contribution) {
          resolve({
            data: JSON.parse(contribution),
            source: 'cache',
          });
        }
      });
    });
  });
};

const insertCacheForOneContribution = async (id, data) => {
  redisClient.hgetall('allContributions', async (err, contributions) => {
    if (err) {
      console.log(err);
    }

    // cache miss
    if (!contributions) {
      const contributionListFromDB = await getAllConfirmedContributions();
      await setNewCacheForContributions(contributionListFromDB);
    }

    // cache hit
    await redisClient.hset('allContributions', id, JSON.stringify(data));
  });
};

const deleteCacheForOneContribution = async (id, data) => {
  redisClient.hgetall('allContributions', async (err, contributions) => {
    if (err) {
      console.log(err);
    }

    // cache miss
    if (!contributions) {
      const contributionListFromDB = await getAllConfirmedContributions();
      await setNewCacheForContributions(contributionListFromDB);
    }

    // cache hit
    if (contributions) {
      await redisClient.hdel('allContributions', id);
    }
  });
};

const updateContributionHit = async (id) => {
  try {
    Contribution.findOneAndUpdate(
      {
        contribution_id: id,
      },
      {
        $inc: {
          hit: 1,
        },
      },
      (err, data) => {
        if (err) {
          throw err;
        }
        redisClient.hget('allContributions', id, async (err, data) => {
          if (err) {
            throw err;
          }
          let temp = JSON.parse(data);
          temp.hit += 1;
          redisClient.hset('allContributions', id, JSON.stringify(temp));
          return true;
        });
      }
    );
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllConfirmedContributions,
  checkCacheForContributions,
  checkCacheForOneContribution,
  updateContributionHit,
  insertCacheForOneContribution,
  deleteCacheForOneContribution,
};
