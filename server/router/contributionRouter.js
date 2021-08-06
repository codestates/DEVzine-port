const { addContribution } = require('../controller/contribution');
const express = require('express');
const router = express.Router();

router.post('/', addContribution);

module.exports = router;