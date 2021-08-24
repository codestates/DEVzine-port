const {
  addContribution,
  deleteContribution,
  updateContribution,
  viewContribution,
} = require('../controller/contribution');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  addContribution,
);
router.delete(
  '/:contributionid',
  passport.authenticate('jwt', { session: false }),
  deleteContribution,
);
router.patch(
  '/:contributionid',
  passport.authenticate('jwt', { session: false }),
  updateContribution,
);
router.get(
  '/update/:contributionid',
  passport.authenticate('jwt', { session: false }),
  viewContribution,
);

module.exports = router;
