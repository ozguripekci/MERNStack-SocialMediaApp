const express = require('express');
//! userController will  be handled later!
// const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router = express.Router();

router.post('/register', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

//This line of code, will protect all routes which they are comes after this line acc. to the JWT verification.
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword)

router.use(authController.restrictTo('admin'));

module.exports = router
