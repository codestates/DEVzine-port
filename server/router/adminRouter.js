const {
  getAllUsersContribution,
  adminSignIn,
  adminSignOut,
  acceptContribRequest,
  rejectContribRequest,
} = require('../controller/admin');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/contributionlist',
  passport.authenticate('adminJWT', { session: false }),
  getAllUsersContribution,
);
router.post('/signout', adminSignOut);
router.post(
  '/signin',
  passport.authenticate('admin', { session: false }),
  adminSignIn,
);
router.post(
  '/contribution/reject',
  passport.authenticate('adminJWT', { session: false }),
  rejectContribRequest,
);
router.post(
  '/contribution/accept',
  passport.authenticate('adminJWT', { session: false }),
  acceptContribRequest,
);

module.exports = router;
