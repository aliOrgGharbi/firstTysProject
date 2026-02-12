import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import validator from "validator";

export const validateUserId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;

  if (!id || !Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      reason: "Invalid ID format. The ID provided is not a valid MongoDB ObjectId."
    });
  }
  next();
};


export const validateUserInput = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ reason: "Operation failed: No data provided." });
  }
  const { email, password } = req.body;
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ reason: "Please provide a valid email address" });
  } else if (!password || !validator.isStrongPassword(password)) {
    return res.status(400).json({
      reason: "Password too weak. Must include uppercase, numbers, and symbols.",
    });
  } else {
    next();
  }
};