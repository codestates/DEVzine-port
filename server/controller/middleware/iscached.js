const { getRecentArticles } = require('../crawler/article-crawler')
const Redis = require('redis');
const redisClient = new Redis.createClient(); // use default parameters or use url (localhost === default)

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
            const result = await getRecentArticles();
            redisClient.setex('crawlerActivated', 10, JSON.stringify(result)); // TODO: 최종 세팅 때는 24시간으로 설정
            return next();
        })

    }

}