const { Contribution } = require('../../Models/Contributions')
const redisClient = require('../../config/redis')

const getAllConfirmedContributions = async () => {

    const contributionList = await Contribution.aggregate([ 
        {
            $match: {
                status: {
                    $in: [ 110, 111 ]
                }
            }
        }, 
        {
            $lookup: {
                from: "users",
                localField: "user_email",
                foreignField: "user_email",
                as: "user_info"
            }
        },
        {
            $project: {
                _id: 0,
                contribution_id: 1,
                contribution_keyword: 1,
                contribution_title: 1,
                contribution_url: 1,
                contribution_content:1,
                contribution_date: 1,
                status: 1,
                hit: 1,
                user_name: { $arrayElemAt: [ "$user_info.user_name", 0 ] }
            }
        }
    ])
    
    return contributionList;

}

const setNewCacheForContributions = async (contributions) => {

    for (let i = 0; i < contributions.length; i++) {
        let id = contributions[i].contribution_id;
        await redisClient.hset('allContributions', id, JSON.stringify(contributions[i]));
    }
    await redisClient.expire('allContributions', 60 * 60 * 24);

}

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
                resolve(
                    {
                        contributionData: contributionListFromDB,
                        contributionSource: 'DB'
                    }
                );
            }

            // cache hit
            if (contributions) { 
                let contributionData = [];
                for (let key in contributions) {
                    contributionData.push(JSON.parse(contributions[key]))
                }
                resolve(
                    {
                        contributionData,
                        contributionSource: 'cache'
                    }
                );
            }

        });

    })

}

    
module.exports = {
    getAllConfirmedContributions,
    checkCacheForContributions
}