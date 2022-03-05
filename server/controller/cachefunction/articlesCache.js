const { Article } = require('../../Models/Articles');
const redisClient = require('../../config/redis');

const getArticlesPastTwoWeeks = async () => {
  let compareDate = new Date(Date.now());
  compareDate.setDate(compareDate.getDate() - 14);

  const articlesPastTwoWeeks = await Article.find(
    {
      article_date: {
        $gte: compareDate,
      },
    },
    {
      _id: 0,
    },
  ).sort({
    article_date: -1,
  });
  return articlesPastTwoWeeks;
};

const setNewCacheForArticles = async articles => {
  await redisClient.del('recentArticles');

  for (let i = 0; i < articles.length; i++) {
    let id = articles[i].article_id;
    await redisClient.hSet('recentArticles', id, JSON.stringify(articles[i]));
  }
};

const checkCacheForArticles = async () => {
  const articles = await redisClient.hGetAll('recentArticles')
  if (Object.values(articles).length === 0) {
    const articlesFromDB = await getArticlesPastTwoWeeks();
    await setNewCacheForArticles(articlesFromDB);
    return{
      articleData: articlesFromDB,
      articleSource: 'DB',
    };
  }
  let articleData = [];
  for (let key in articles) {
    articleData.push(JSON.parse(articles[key]));
  }
  articleData.sort((a, b) => {
    return new Date(b.article_date) - new Date(a.article_date);
  });
  return{
    articleData,
    articleSource: 'cache',
  };
};

const checkCacheForOneArticle = async id => {

  const articles = await redisClient.hGetAll('recentArticles');
  
  if (Object.values(articles).length === 0) {
    const articlesFromDB = await getArticlesPastTwoWeeks();
    await setNewCacheForArticles(articlesFromDB);
  }
      
  const singleArticle = await redisClient.hGet('recentArticles', id);

  if (!singleArticle) {
    const articleFromDB = await Article.findOne(
      {
        article_id: id,
      },
      {
        _id: 0,
      },
    );
    return{
      data: articleFromDB,
      source: 'DB',
    };
  }

  return{
    data: JSON.parse(singleArticle),
    source: 'cache',
  };

};

const updateArticleHit = async id => {
  try {
    Article.updateOne(
      {
        article_id: id,
      },
      {
        $inc: {
          hit: 1,
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
        }

        Article.findOne(
          {
            article_id: id,
          },
          {
            _id: 0,
          },
          (err, data) => {
            if (err) {
              console.log(err);
            }

            redisClient.HMSET('recentArticles', id, JSON.stringify(data));
          },
        );
      },
    );
  } catch (err) {
    return err;
  }
};

module.exports = {
  getArticlesPastTwoWeeks,
  setNewCacheForArticles,
  checkCacheForArticles,
  checkCacheForOneArticle,
  updateArticleHit,
};
