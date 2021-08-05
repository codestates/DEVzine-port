const { signIn } = require('../controller/signIn');
const express = require('express');
const router = express.Router();

router.post('/', signIn);

module.exports = router;