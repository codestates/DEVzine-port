const { signUp, signIn, signOut } = require('../controller/user');
const express = require('express');
const router = express.Router();

router.post('/signup', signUp);
router.post('/signout', signOut);
router.post('/signin', signIn);

module.exports = router;