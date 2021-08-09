const { getAllUsersContribution, adminSignin, temp } = require('../controller/admin');
const express = require('express');
const router = express.Router();

router.get('/contributionlist', adminSignin);
router.post('/signin', adminSignin);
router.post('/contribution/update', temp);

module.exports = router;