const { getArticle } = require('../controller/article');
const express = require('express');
const router = express.Router();

router.get('/:articleid', getArticle);

module.exports = router;