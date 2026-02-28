import { Request, Response, NextFunction } from "express";
import validator from "validator";
import { Types } from "mongoose";

export const validateCardId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
  
    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        reason: "Invalid ID format. The ID provided is not a valid MongoDB ObjectId."
      });
    }
    next();
  };

export const validateCardInput = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ reason: "Operation failed: No data provided." });
    }

    const { userId, cardNumber, cardType, status } = req.body;

    if (!userId || !validator.isMongoId(String(userId))) {
        return res.status(400).json({ error: "User ID is required." });
    }

    if (!cardNumber || !validator.isCreditCard(cardNumber)) {
        return res.status(400).json({ error: "Invalid or missing credit card number." });
    }

    const validTypes = ['Visa', 'MasterCard'];
    if (cardType && !validTypes.includes(cardType)) {
        return res.status(400).json({ error: "Card type must be either Visa or MasterCard." });
    }

    const validStatuses = ['active', 'blocked'];
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: "Status must be either 'active' or 'blocked'." });
    }

    next();
};