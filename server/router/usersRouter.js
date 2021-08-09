const { signUp } = require('../controller/users');
const { signOut } = require('../controller/users');
const { signIn } = require('../controller/users');
const express = require('express');
const router = express.Router();

router.post('/signup', signUp);
router.post('/signout', signOut);
router.post('/signin', signIn);

module.exports = router;