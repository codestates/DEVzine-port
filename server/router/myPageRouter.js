const { getUserInfo, patchUserInfo } = require('../controller/myPage');
const express = require('express');
const router = express.Router();

router.get('/', getUserInfo);
router.patch('/', patchUserInfo);

module.exports = router;