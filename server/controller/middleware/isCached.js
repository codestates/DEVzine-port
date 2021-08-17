const redisClient = require('../../config/redis')

module.exports = {

    checkCacheForVisuals: (req, res, next) => {

        redisClient.get('visualsActivated', async (err, data) => {

            if (err) {
                console.log(err);
                return res.status(500).send('Error');
            }

            if (data) {
                return res.status(200).json(
                    {
                        "data": JSON.parse(data), 
                        "message": "success", 
                        "source": "cache"
                    }
                );
            }

            return next();

        })
        
    }

}