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
      errorReturn.push("Email overlaps");
    }
    else{
      if(error.errors.email){errorReturn.push(error.errors.email.properties.message);}
      if(error.errors.password){errorReturn.push(error.errors.password.properties.message);}
    }

    res.status(400).json(errorReturn);

  }
};


module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Login called, email:", email, ", password:", password)

  // If no email or password is inputted (This won't happen naturally as input fields are "required")
  if (!email || !password) {
    //return next(new ErrorResponse('Please provide an email and password', 400));
    res.status(400).json("Please provide an email and password");
    return;
  }

  try {

    // Find the user in the database (if not existent, throw error)
    const user = await User.findOne({ email }).select('+password');

    console.log("User found in the login backend: ", user);

    if (!user) {
      res.status(400).json("누구세요? 당신같은 사람은 없거든요");
      return;
      //return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // Find if the password inputted is equal to the user's password
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      res.status(400).json("ㅂㅅ 그걸 틀리누");
      //return next(new ErrorResponse('Invalid Credentials', 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log("error occured", error)
    next(error);
  }
};



module.exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  console.log("forgetPassword called, email:", email)

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      next(new ErrorResponse('Email cannot be sent', 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();
    const resetUrl = `https://suhoihn-frontend-d0d1edd8399f.herokuapp.com/passwordreset/${resetToken}`;
    // const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    

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
      next(new ErrorResponse('Email cannot be sent', 404));
    }
  } catch (error) {
    console.log("error occured", error)
    next(error);
  }
};


module.exports.resetPassword = async (req, res, next) => {
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
      return next(new ErrorResponse('Invalid reset token', 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(201).json({
      success: true,
      data: 'Password reset success',
    });
  } catch (error) {
    next(error);
  }
};


// Send the token through the router
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};