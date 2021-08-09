const { getMagazineList, getArticle, getContribution } = require('../controller/magazine');
const express = require('express');
const router = express.Router();

router.get('/:curtotal', getMagazineList);
router.get('/article/:articleid', getArticle);
router.get('/contribution/:contributionid', getContribution);

module.exports = router;