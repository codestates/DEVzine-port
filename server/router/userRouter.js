const { signUp, signIn, signOut, deleteUser. findPassword } = require('../controller/user');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/signup', signUp);
router.post('/signout', signOut);
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  signIn,
);
router.delete(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  deleteUser,
);
router.post('/password', findPassword);

module.exports = router;
