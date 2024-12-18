const express = require('express');
const router = express.Router();
const {signUp} = require("../controller/authControllerSignUp");
const {logIn} = require("../controller/authControllerLogin");
const {logOut} = require("../controller/authControllerLogout");
const { verifyEmail } = require('../controller/authControllerVerifyEmail');

router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);
router.post("/login", logIn);
router.post("/logout", logOut);

module.exports = router;