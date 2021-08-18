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

    redisClient.hgetall('recentArticles', async (err, data) => {

        if (err) {
            return err;
        } else {
            await redisClient.del('recentArticles');
            for (let i = 0; i < articles.length; i++) {
                const id = articles[i].article_id;
                await redisClient.hset('recentArticles', id, JSON.stringify(articles[i]));
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
                resolve(
                    {
                        articleData: articlesFromDB, 
                        articleSource: 'DB'
                    }
                );  
            }

            // cache hit
            if (articles) { 
                let articleData = [];
                for (let key in articles) {
                    articleData.push(JSON.parse(articles[key]))
                }
                resolve(
                    {
                        articleData, 
                        articleSource: 'cache'
                    }
                );
            }

        });

    })

}

const checkCacheForOneArticle = async (id) => {
    
    return new Promise((resolve, reject) => {
        
        redisClient.hget('recentArticles', id, async (err, article) => {
        
            if (err) {
                reject(err);
            }

            if (!article) {
                const articleFromDB = await Article.findOne(
                    {
                        article_id: id
                    }, {
                        _id: 0,
                        __v: 0
                    }
                );
                resolve(
                    {
                        data: articleFromDB,
                        source: 'DB'
                    }
                );
            }

            if (article) {
                
                resolve(
                    {
                        data: JSON.parse(article),
                        source: 'cache'
                    }
                );
            }

        });

    });

}

const updateArticleHit = async (id) => {
    
    try {

        Article.findOneAndUpdate({
                article_id: id
            }, {
                $inc: {
                    hit: 1
                }
            }, (err, data) => {
                if (err) {
                    throw err;
                }
                redisClient.hmset('recentArticles', id, JSON.stringify(data));
                return true;
            }
        )
        
    } catch (err) {

        return err;

    }

}
    
module.exports = {
    getArticlesPastTwoWeeks,
    setNewCacheForArticles,
    checkCacheForArticles,
    checkCacheForOneArticle,
    updateArticleHit
}