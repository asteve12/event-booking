"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.createOne = void 0;
const appError_1 = require("../utils/appError");
const catchAsync_1 = require("../utils/catchAsync");
const createOne = (Model) => catchAsync_1.catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: "Success",
        data: doc,
    });
});
exports.createOne = createOne;
const deleteOne = (Model) => catchAsync_1.catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new appError_1.AppError("No document found by that ID!", 404));
    }
    res.status(204).json({
        status: "Success",
    });
});
exports.deleteOne = deleteOne;
exports.updateOne = (Model) => catchAsync_1.catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!doc) {
        return next(new appError_1.AppError("No document found by that ID!", 404));
    }
    res.status(202).json({
        status: "Success",
        data: doc,
    });
});
exports.getOne = (Model) => catchAsync_1.catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
        return next(new appError_1.AppError("No document found by that ID!", 404));
    }
    res.status(200).json({
        status: "Success",
        data: doc,
    });
});
exports.getAll = (Model) => catchAsync_1.catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.eventId) {
        filter = {
            event: req.params.eventId,
        };
    }
    const docs = await Model.find();
    res.status(200).json({
        status: "Success",
        result: docs.length,
        data: docs,
    });
});
