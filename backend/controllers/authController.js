const { promisify } = require("util");
const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) return next(new AppError("No such user exists!", 404));

  const resetToken = await user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "Success",
    data: {
      email,
      resetToken,
      resetExp: user.passwordResetExpires,
    },
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError("Passwords should match!", 400));
  }
  const resetTokenHashed = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: resetTokenHashed,
    passwordResetExpires: { $gte: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or expired!", 404));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  user.password = undefined;
  user.passwordConfirm = undefined;
  const token = createToken(user.id);
  res.status(200).json({
    status: "Success",
    token,
    data: { user },
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  if (req.body.role === "admin") {
    return next(new AppError("Cannot signup as admin!", 403));
  }
  const newUser = await User.create(req.body);
  const token = createToken(newUser._id);
  newUser.password = undefined;

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (req.secure || req.headers["x-forwarded-proto"] === "https")
    cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "Success",
    token,
    data: { newUser },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Provide password and e-mail!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.checkPassword(password, user.password)) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  const token = createToken(user._id);
  user.password = undefined;

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (req.secure || req.headers["x-forwarded-proto"] === "https")
    cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "Success",
    token,
    data: { user },
  });
});

exports.protectRoute = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    // eslint-disable-next-line prefer-destructuring
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Not authorized! Please login", 401));
  }

  const verify = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(verify.id);

  if (!user) {
    return next(new AppError("Not authorized! Please login", 401));
  }

  req.user = user;
  next();
});

exports.restrict = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError("No permission for this user!", 403));
  }
  next();
};

exports.changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new AppError("No such user!", 404));
  }

  if (!(await user.checkPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Wrong password!", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  const token = createToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (req.secure || req.headers["x-forwarded-proto"] === "https")
    cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "Success",
    token,
    data: {
      email: user.email,
      name: user.name,
    },
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "Success",
    token: "",
  });
});
