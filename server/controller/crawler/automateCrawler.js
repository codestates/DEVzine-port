const { Article } = require('../../Models/Articles');
const { getRecentArticlesFromHours } = require('./article-crawler');
const {
  getArticlesPastTwoWeeks,
  setNewCacheForArticles,
} = require('../cachefunction/articlesCache');

module.exports = {
  crawlerForHours: async (hours) => {
    const data = await getRecentArticlesFromHours(hours);
    await Article.create(data);
    const articlesPastTwoWeeks = await getArticlesPastTwoWeeks();
    await setNewCacheForArticles(articlesPastTwoWeeks);
  }
};
