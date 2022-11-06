const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const catchAsync = require("./../utils/catchAsync")
const jwt = require("jsonwebtoken")


//! JWT Creation
const signToken = id => {
  return jwt.sign({ id} , process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};


//REGISTER
router.post("/register", catchAsync(async (req, res, next) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      //! passwordConfirm tekrardan debug edilmesi gerekebilir...
      passwordConfirm: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
    // createSendToken(user, 201, res)
  } catch (err) {
    res.status(500).json(err)
  }
}));

//LOGIN
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
  next()
});


exports.protect = catchAsync(async(req, res, next) => {
    
  let token;
  // 1) getting token and check it exist
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
  } else if(req.cookies.jwt && req.cookies.jwt !== 'loggedout'){
      token = req.cookies.jwt;
  }
  /* console.log(token); */
  
  if(!token) {
      res.redirect('/')
      return next(new AppError('You are not logged in. Please login to get access.', 401))
  }

  // 2) verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  /* console.log(decoded) */

  // 3) check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
      return next(new AppError('The user belonging to this token does no longer exist', 401));
  } 

  // 4) check if user changed password after the token was issued.
  if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('User recently changed password! Please log in again', 401))
  };

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
})


module.exports = router;