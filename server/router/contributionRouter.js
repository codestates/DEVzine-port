const { addContribution, deleteContribution, updateContribution } = require('../controller/contribution');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), addContribution);
router.delete('/', passport.authenticate('jwt', { session: false }), deleteContribution);
router.patch('/', passport.authenticate('jwt', { session: false }), updateContribution);

module.exports = router;