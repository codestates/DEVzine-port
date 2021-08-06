const { getAllUsers } = require('../controller/landing');
const express = require('express');
const router = express.Router();

router.get('/', getAllUsers);

module.exports = router;