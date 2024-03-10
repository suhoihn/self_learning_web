const User = require("../db/model/User");
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');


// Create a user in the database
module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log("register called from backend, username:", username, ", email:", email, ", password:", password)

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 201, res);
    console.log("Registration success");

  } catch (error) {
    console.log("Oops! Error occured while creating the user: \n", error);
    //next(error);
    const errorReturn = [];


    // If the error is about duplicate emails
    if (error.code === 11000) {
      errorReturn.push("Username overlaps");
    }
    else{
      if(error.errors.email){errorReturn.push(error.errors.email.properties.message);}
      if(error.errors.password){errorReturn.push(error.errors.password.properties.message);}
    }

    res.status(400).json(errorReturn);

  }
};


module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log("Login called, email:", username, ", password:", password)

  // If no username or password is inputted (This won't happen naturally as input fields are "required")
  if (!username || !password) {
    //return next(new ErrorResponse('Please provide an email and password', 400));
    res.status(400).json("Please provide an email and password");
    return;
  }

  try {

    // Find the user in the database (if not existent, throw error)
    const user = await User.findOne({ username: username }).select('+password');

    console.log("User found in the login backend: ", user);

    if (!user) {
      res.status(400).json("No such username exists");//누구세요? 당신같은 사람은 없거든요");
      return;
      //return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // Find if the password inputted is equal to the user's password
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      res.status(400).json("Wrong password");//ㅂㅅ 그걸 틀리누");
      //return next(new ErrorResponse('Invalid Credentials', 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log("error occured", error)
    next(error);
  }
};



module.exports.forgotPassword = async (req, res, next) => {
  const { username, email } = req.body;
  console.log("forgetPassword called, email:", email)

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json("No such user exists");
      // next(new ErrorResponse('Email cannot be sent', 404));
    }

    // if email doesn't match
    if( user.email !== email ){
      return res.status(404).json("Wrong Email");
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();
    //const resetUrl = `https://suhoihn-frontend-d0d1edd8399f.herokuapp.com/passwordreset/${resetToken}`;
    const resetUrl = `http://localhost:3000/resetscreen/${resetToken}`;
    
    const imgSrc = "data:image/jpeg;base64,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";

    const message = `<h1>You have requested a password reset</h1><p>Please go to this link to reset your password</p><a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

    try {
      // Send the email
      sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message,
      });
      res.status(200).json({ success: true, data: 'Email Sent' });
    } catch (error) {
      console.log("error occured while SendEmail, error:", error)
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(404).json("Email cannot be sent");
      //next(new ErrorResponse('Email cannot be sent', 404));
    }
  } catch (error) {
    console.log("error occured", error)
    res.status(500).json(error);
    //next(error);
  }
};


module.exports.resetPassword = async (req, res, next) => {
  console.log("reset password called with token");
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      console.log("Invalid reset token!");
      res.status(400).json("Invalid reset token. This link is no longer valid");
      return;
      //return next(new ErrorResponse('Invalid reset token', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    const token = user.getSignedToken();
    sendToken(user, 201, res);
      // res.status(201).json({
    //   success: true,
    //   data: 'Password reset success',
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    //next(error);
  }
};


// Send the token through the router
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true, 
    username: user.username,
    email: user.email,
    token
  });
};