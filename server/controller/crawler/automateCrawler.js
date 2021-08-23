const { Article } = require('../../Models/Articles');
const {
  getRecentArticlesFrom24H,
  getRecentArticlesFrom48H,
} = require('./article-crawler');
const {
  getArticlesPastTwoWeeks,
  setNewCacheForArticles,
} = require('../cachefunction/articlesCache');

module.exports = {

  crawlerFor24H: async () => {
    const data = await getRecentArticlesFrom24H();
    await Article.create(data);
    const articlesPastTwoWeeks = await getArticlesPastTwoWeeks();
    await setNewCacheForArticles(articlesPastTwoWeeks);
  },

  crawlerFor48H: async () => {
    const data = await getRecentArticlesFrom48H();
    await Article.create(data);
    const articlesPastTwoWeeks = await getArticlesPastTwoWeeks();
    await setNewCacheForArticles(articlesPastTwoWeeks);
  }

}