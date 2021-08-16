const { signUp, signIn, signOut, deleteUser } = require('../controller/user');
const passport = require('passport');
const express = require('express');
const router = express.Router();

router.post('/signup', signUp);
router.post('/signout', passport.authenticate('jwt', { session: false }), signOut);
router.post('/signin', passport.authenticate('local', { session: false }), signIn);
router.delete('/delete', deleteUser);

module.exports = router;