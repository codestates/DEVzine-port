const {
  getAllArticlesAndRecentContributions,
  getAllContributions,
  getArticle,
  getContribution,
} = require('../controller/magazine');
const { checkAdminAuth } = require('../controller/middleware/isAdmin');
const express = require('express');
const router = express.Router();

router.get('/', getAllArticlesAndRecentContributions);
router.get('/article/:articleid', getArticle);
router.get('/contribution/all', getAllContributions);
router.get('/contribution/:contributionid', checkAdminAuth, getContribution);

module.exports = router;
