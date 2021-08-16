const { signUp, signIn, signOut, deleteUser } = require('../controller/user');
const passport = require('passport');
const express = require('express');
const router = express.Router();

router.post('/signup', signUp);
router.post('/signout', signOut);
router.post('/signin', signIn);
router.delete('/delete', deleteUser);

module.exports = router;