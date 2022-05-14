const factory = require("./handlerFactory");
const { User } = require("../models/userModel");
const { catchAsync } = require("../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.createUser = factory.createOne(User);
exports.getAllUsers = factory.getAll(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
exports.getUser = factory.getOne(User);
