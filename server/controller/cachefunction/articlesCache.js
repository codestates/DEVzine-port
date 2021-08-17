const { Article } = require('../../Models/Articles');
const redisClient = require('../../config/redis');

module.exports = {

    getArticlesPastTwoWeeks: async() => {

        let compareDate = new Date(Date.now());
        compareDate.setDate(compareDate.getDate() - 14);
        const articlesPastTwoWeeks = await Article.find(
            {
                article_date: {
                    $gte: compareDate
                },
            }, {
                _id: 0,
                __v: 0
            }
        ).sort(
            {
                article_id: -1
            }
        );
        return articlesPastTwoWeeks;

    },

    setNewCacheForArticles: async(articles) => {
  
        await redisClient.hgetall('recentArticles', async (err, data) => {
            if (err) {
                return err;
            } else {
                await redisClient.del('recentArticles');
                for (let i = 0; i < articles.length; i++) {
                    const id = articles[i].article_id;
                    await redisClient.hset('recentArticles', `article_${id}`, JSON.stringify(articles[i]));
                }
            }
        })

        return true;

    },
}