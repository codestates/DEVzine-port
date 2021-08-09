const { addSubscriber } = require('../controller/subscribe');
const express = require('express');
const router = express.Router();

router.post('/', addSubscriber);

module.exports = router;