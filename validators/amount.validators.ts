import { Request, Response, NextFunction } from "express";
import validator from "validator";


export const validateAmountBody = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ reason: "Operation failed: No data provided." });
    }

    const { cardId, balance, currency } = req.body;

    if (!cardId || !validator.isMongoId(String(cardId))) {
        return res.status(400).send("Valid Card ID is required");
    }

    if (balance !== undefined && !validator.isNumeric(String(balance))) {
        return res.status(400).send("Balance must be a number");
    }

    if (currency !== undefined && !validator.isISO4217(String(currency))) {
        return res.status(400).send("Currency must be a 3-letter ISO code (e.g., USD)");
    }

    next();
};