const { getUserInfo, patchUserInfo } = require('../controller/myPage');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getUserInfo);
router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  patchUserInfo
);

module.exports = router;
