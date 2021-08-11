const redisClient = require('../../config/redis')
const { getRecentArticles } = require('../crawler/article-crawler')

module.exports = {

    checkCacheForArticles: (req, res, next) => {
        
        redisClient.get('crawlerActivated', async (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error');
            }
            if (data) {
                return res.status(200).send(JSON.parse(data));
            }
            // const result = await getRecentArticles();
            const result = 'test';
            redisClient.setex('crawlerActivated', 10, JSON.stringify(result)); // TODO: 최종 세팅 때는 24시간으로 설정
            return next();
        })

    },

    checkCacheForVisuals: (req, res, next) => {

        redisClient.get('visualsActivated', async (err, data) => {
            if(err) {
                console.log(err);
                return res.status(500).send('Error');
            }
            if(data) {
                return res.status(200).send(data);
            }
            return next();
        })
    }

}