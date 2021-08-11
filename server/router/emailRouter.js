const { reqUserEmail, verifyUserEmail } = require('../controller/email');
const express = require('express');
const router = express.Router();

router.post('/req', reqUserEmail);
router.post('/verify', verifyUserEmail);

module.exports = router;