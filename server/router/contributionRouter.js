const { addContribution, deleteContribution, updateContribution } = require('../controller/contribution');
const express = require('express');
const router = express.Router();

router.post('/', addContribution);
router.delete('/', deleteContribution);
router.patch('/', updateContribution);

module.exports = router;