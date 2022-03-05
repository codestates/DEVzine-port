const { Contribution } = require('../Models/Contributions');
const { User } = require('../Models/Users');
const {
  checkCacheForArticles,
  checkCacheForOneArticle,
  updateArticleHit,
} = require('./cachefunction/articlesCache');
const {
  checkCacheForContributions,
  checkCacheForOneContribution,
  updateContributionHit,
} = require('./cachefunction/contributionsCache');

module.exports = {
  getAllArticlesAndRecentContributions: async (req, res) => {
    try {
      const { articleData, articleSource } = await checkCacheForArticles();

      let { contributionData, contributionSource } =
        await checkCacheForContributions();

        if (!articleData || !contributionData) {
        return res.status(404).json({
          message: 'Not found',
        });
      }

      contributionData = contributionData.slice(0, 6);

      return res.status(200).json({
        articleData,
        contributionData,
        articleSource,
        contributionSource,
        message: 'Article list successfully found',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  getAllContributions: async (req, res) => {
    try {
      const { contributionData, contributionSource } =
        await checkCacheForContributions();

      if (!contributionData) {
        return res.status(404).json({
          message: 'Not found',
        });
      }

      return res.status(200).json({
        data: contributionData,
        source: contributionSource,
        message: 'Request success',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  getArticle: async (req, res) => {
    try {
      const articleid = Number(req.params.articleid);

      const { data, source } = await checkCacheForOneArticle(articleid);

      if (!data) {
        return res.status(404).json({
          message: 'Not found',
        });
      }

      updateArticleHit(articleid);

      return res.status(200).json({
        data,
        source,
        message: 'Article successfully found',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  getContribution: async (req, res) => {

    const contributionid = Number(req.params.contributionid);

    try {

        const cacheResult = await checkCacheForOneContribution(contributionid);

        if (cacheResult === 'Not found') {
          return res.status(404).json({
            message: 'Not found',
          });
        }

        const { data, source } = cacheResult;

        if (!req.user || req.user.user_email) {

          updateContributionHit(contributionid);

        }

        return res.status(200).json({
          data,
          source,
          message: 'Contribution successfully found',
        });
      
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
