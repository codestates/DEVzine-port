const {
  reqUserEmail,
  verifyUserEmail,
  updatePasswordEmail,
} = require('../controller/email');
const express = require('express');
const router = express.Router();

router.post('/req', reqUserEmail);
router.post('/verify', verifyUserEmail);
router.post('/password', updatePasswordEmail);

module.exports = router;
