const { Contribution } = require('../../Models/Contributions');
const redisClient = require('../../config/redis');

const getAllConfirmedContributions = async () => {
  const contributionList = await Contribution.aggregate([
    {
      $match: {
        status: {
          $in: [110, 111, 121, 122],
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
        user_name: {
          $ifNull: [
            {
              $arrayElemAt: ['$user_info.user_name', 0],
            },
            'anonymous',
          ],
        },
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

const setNewCacheForContributions = async contributions => {
  await redisClient.del('allContributions');
  for (let i = 0; i < contributions.length; i++) {
    let id = contributions[i].contribution_id;
    await redisClient.hSet(
      'allContributions',
      id,
      JSON.stringify(contributions[i]),
    );
  }
  await redisClient.expire('allContributions', 60 * 60 * 24); 
};

const checkCacheForContributions = async () => {

  const contributions = await redisClient.hGetAll('allContributions')

  if (Object.values(contributions).length === 0) {
    const contributionListFromDB = await getAllConfirmedContributions();
    await setNewCacheForContributions(contributionListFromDB);
    return{
      contributionData: contributionListFromDB,
      contributionSource: 'DB',
    };
  }

  let contributionData = [];
  for (let key in contributions) {
    contributionData.push(JSON.parse(contributions[key]));
  }
  contributionData.sort((a, b) => {
    return new Date(b.contribution_date) - new Date(a.contribution_date);
  });
  return{
    contributionData,
    contributionSource: 'cache',
  };

};

const checkCacheForOneContribution = async id => {

  const contributions = await redisClient.hGetAll('allContributions')
  if (Object.values(contributions).length === 0) {
    const contributionListFromDB = await getAllConfirmedContributions();
    await setNewCacheForContributions(contributionListFromDB);
  }

  const singleContribution = await redisClient.hGet('allContributions', id);
  
  if (!singleContribution) {
    return 'Not found';
  }

  return{
    data: JSON.parse(singleContribution),
    source: 'cache',
  };

};

const insertCacheForOneContribution = async (id, data) => {
  redisClient.hGetAll('allContributions', async (err, contributions) => {
    if (err) {
      console.log(err);
    }

    // cache miss
    if (!contributions) {
      const contributionListFromDB = await getAllConfirmedContributions();
      await setNewCacheForContributions(contributionListFromDB);
    }

    // cache hit
    await redisClient.hSet('allContributions', id, JSON.stringify(data));
  });
};

const deleteCacheForOneContribution = async (id, data) => {
  redisClient.hGetAll('allContributions', async (err, contributions) => {
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

const updateContributionHit = async id => {
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
        redisClient.hGet('allContributions', id, async (err, data) => {
          if (err) {
            throw err;
          }
          let temp = JSON.parse(data);
          temp.hit += 1;
          redisClient.hmset('allContributions', id, JSON.stringify(temp));
          return true;
        });
      },
    );
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllConfirmedContributions,
  setNewCacheForContributions,
  checkCacheForContributions,
  checkCacheForOneContribution,
  updateContributionHit,
  insertCacheForOneContribution,
  deleteCacheForOneContribution,
};
