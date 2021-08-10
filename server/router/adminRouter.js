const { getAllUsersContribution, adminSignin, acceptContribRequest, rejectContribRequest } = require('../controller/admin');
const express = require('express');
const router = express.Router();

router.get('/contributionlist', getAllUsersContribution);
router.post('/signin', adminSignin);
router.post('/contribution/reject', rejectContribRequest);
router.post('/contribution/accept', acceptContribRequest);

module.exports = router;