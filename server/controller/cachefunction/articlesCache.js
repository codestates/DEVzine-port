const { Article } = require('../../Models/Articles');
const redisClient = require('../../config/redis');

const getArticlesPastTwoWeeks = async () => {

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

}

const setNewCacheForArticles = async (articles) => {

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

}

const checkCacheForArticles = async () => {
    
    return new Promise((resolve, reject) => {
        
        redisClient.hgetall('recentArticles', async (err, articles) => {
        
        if (err) {
            reject(err);
        }

        // cache miss
        if (!articles) { 
            const articlesFromDB = await getArticlesPastTwoWeeks();
            resolve({data: articlesFromDB, source: 'DB'});  
        }

        // cache hit
        if (articles) { 
            let articleData = [];
            for (let key in articles) {
                articleData.push(JSON.parse(articles[key]))
            }
            resolve({data: articleData, source: 'cache'});
        }

        });

    })

}
    
module.exports = {
    getArticlesPastTwoWeeks,
    setNewCacheForArticles,
    checkCacheForArticles
}