const { unsubscribe } = require('../controller/unsubscribe');
const express = require('express');
const router = express.Router();

router.post('/', unsubscribe);

module.exports = router;
