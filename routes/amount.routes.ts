import { Router } from "express";
import { 
    findAllAmounts, 
    getBalanceByCardId, 
    createAmount, 
    updateAmountFull, 
    patchAmount, 
    deleteAmount 
} from "../service/amount.services";
import { validateAmountBody } from "../validators/amount.validators";
import { validateUserId } from "../validators/users.validators";

const router = Router();

router.get("/", (req, res) => {
    findAllAmounts()
        .then((amounts) => res.status(200).json(amounts))
        .catch((err) => res.status(500).send("Error fetching amounts"));
});

router.get("/:cardId", validateUserId, (req, res) => {
    const id = req.params.cardId as string;
    getBalanceByCardId(id)
        .then((amount) => {
            if (!amount) return res.status(404).send("Amount record not found");
            res.status(200).json(amount);
        })
        .catch((err) => res.status(500).send("Error fetching amount record"));
});

router.post("/", validateAmountBody, (req, res) => {
    const amountData = req.body;
    createAmount(amountData)
        .then((amount) => res.status(201).json(amount))
        .catch((err) => res.status(500).send("Error creating amount record"));
});

router.put("/:cardId", validateUserId, validateAmountBody, (req, res) => {
    const id = req.params.cardId as string;
    updateAmountFull(id, req.body)
        .then((amount) => {
            if (!amount) return res.status(404).send("Amount record not found");
            res.status(200).json(amount);
        })
        .catch((err) => res.status(500).send("Error updating amount"));
});

router.patch("/:cardId", validateUserId, (req, res) => {
    const id = req.params.cardId as string;
    patchAmount(id, req.body)
        .then((amount) => {
            if (!amount) return res.status(404).send("Amount record not found");
            res.status(200).json(amount);
        })
        .catch((err) => res.status(500).send("Error patching amount"));
});

router.delete("/:cardId", validateUserId, (req, res) => {
    const id = req.params.cardId as string;
    deleteAmount(id)
        .then((amount) => {
            if (!amount) return res.status(404).send("Amount record not found");
            res.status(200).send("Amount record deleted successfully");
        })
        .catch((err) => res.status(500).send("Error deleting amount record"));
});

export default router;