import { Schema, model, Document, Model, Mongoose } from "mongoose";
import { RequestHandler, Request, Response, NextFunction } from "express";

import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

export const createOne = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "Success",
      data: doc,
    });
  });

export const deleteOne = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found by that ID!", 404));
    }

    res.status(204).json({
      status: "Success",
    });
  });

exports.updateOne = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found by that ID!", 404));
    }

    res.status(202).json({
      status: "Success",
      data: doc,
    });
  });

exports.getOne = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("No document found by that ID!", 404));
    }

    res.status(200).json({
      status: "Success",
      data: doc,
    });
  });

exports.getAll = (Model: Model<Document>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
