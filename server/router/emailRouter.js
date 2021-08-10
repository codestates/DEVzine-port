const { verifyUserEmail } = require('../controller/email');
const express = require('express');
const router = express.Router();

router.post('/verify', verifyUserEmail);

module.exports = router;