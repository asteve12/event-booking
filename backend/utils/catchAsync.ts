import { RequestHandler } from "express";

export const catchAsync: Function = (fn: Function): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
};
