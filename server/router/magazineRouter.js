const { getAllArticlesAndRecentContributions, getAllContributions, getArticle, getContribution } = require('../controller/magazine');
const express = require('express');
const router = express.Router();

router.get('/', getAllArticlesAndRecentContributions);
router.get('/article/:articleid', getArticle);
router.get('/contribution/:contributionid', getContribution);
router.get('/contribution/all', getAllContributions);

module.exports = router;