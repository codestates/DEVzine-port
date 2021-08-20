const { getAllUsersContribution, adminSignin, acceptContribRequest, rejectContribRequest } = require('../controller/admin');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/contributionlist', passport.authenticate('adminJWT', { session:false }), getAllUsersContribution);
router.post('/signin', passport.authenticate('admin', { session: false}), adminSignin);
router.post('/contribution/reject', passport.authenticate('adminJWT', { session:false }), rejectContribRequest);
router.post('/contribution/accept', passport.authenticate('adminJWT', { session:false }), acceptContribRequest);

module.exports = router;