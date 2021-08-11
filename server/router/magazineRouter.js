const { getMagazineList, getArticle, getContribution } = require('../controller/magazine');
const { checkCacheForArticles } = require('../controller/middleware/isCached')
const express = require('express');
const router = express.Router();

router.get('/:curtotal', checkCacheForArticles, getMagazineList);
router.get('/article/:articleid', getArticle);
router.get('/contribution/:contributionid', getContribution);

module.exports = router;