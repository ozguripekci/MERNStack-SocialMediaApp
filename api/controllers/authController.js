//! GLOBAL IMPORTS
const {promisify} = require('util');
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken');
const AppError  = require('./../utils/appError');
// not using yet email feature
const sendEmail  = require('./../utils/email');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Model imports
const User = require('../models/User');

//! JSON WEB TOKEN Create, and send

const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  //Remove password from output
  user.password =  undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  })
}


//! SIGNUP
exports.signup = catchAsync( async (req, res, next) => {
    //create new user and send it token
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      passwordConfirm: hashedPassword,
      passwordChangeAt: req.body.passwordChangeAt,
      role:req.body.role
    });
    createSendToken(newUser, 201, res)

});

//! LOGIN
exports.login = Async( async (req, res, next) => {

    const { email, password } = req.body;

        // 1) check if email and password exists
    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password')


    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) Check if everything is ok and, send token to client
    createSendToken(user, 200, res)

});


router.get('/logout', async(req,res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.status(200).json({
    success: 'success',
    message: 'You succesfully logout!'
  })
})

module.exports = router;