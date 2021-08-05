const { signUp } = require('../controller/signUp');
const express = require('express');
const router = express.Router();

router.post('/', signUp);

module.exports = router;