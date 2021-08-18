const { Contribution } = require('../../Models/Contributions')

const checkCacheForContributions = async () => {
    
    return new Promise((resolve, reject) => {
        
        redisClient.hgetall('allContributions', async (err, contributions) => {
        
            if (err) {
                reject(err);
            }

            // cache miss
            if (!contributions) { 
                // get data
                // set cache 
                resolve(
                    {
                        contributionData: '',
                        contributionSource: 'DB'
                    }
                );
            }

            // cache hit
            if (contributions) { 
                let contributionData = [];
                for (let key in contributions) {
                    articleData.push(JSON.parse(contributions[key]))
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
    checkCacheForContributions
}