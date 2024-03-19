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
    console.log("Error occured while creating the user: \n", error);
    const errorReturn = [];


    // If the error is about duplicate username
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
    res.status(400).json("Please provide an email and password");
    return;
  }

  try {
    // Find the user in the database (if not existent, throw error)
    const user = await User.findOne({ username: username }).select('+password');

    console.log("User found in the login backend: ", user);

    if (!user) {
      res.status(400).json("No such username exists");
      return;
    }

    // Find if the password inputted is equal to the user's password
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      res.status(400).json("Wrong password");
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log("error occured", error)
    next(error);
  }
};



module.exports.forgotPassword = async (req, res, next) => {
  const { username, email } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json("No such user exists");
    }

    // if email doesn't match
    if( user.email !== email ){
      return res.status(404).json("Wrong Email");
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();
    //const resetUrl = `https://suhoihn-frontend-d0d1edd8399f.herokuapp.com/passwordreset/${resetToken}`;
    const resetUrl = `http://localhost:3000/resetscreen/${resetToken}`;

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
    }
  } catch (error) {
    console.log("error occured", error)
    res.status(500).json(error);
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