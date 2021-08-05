const { signOut } = require('../controller/signOut');
const express = require('express');
const router = express.Router();

router.post('/', signOut);

module.exports = router;