const { getArticleList } = require('../controller/articleList');
const express = require('express');
const router = express.Router();

router.get('/:curtotal', getArticleList);

module.exports = router;