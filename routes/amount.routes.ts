import { Router } from "express";
import {
  findAllAmounts,
  getBalanceByCardId,
  createAmount,
  updateAmountFull,
  patchAmount,
  deleteAmount,
  getTotalBalanceByCardId,
} from "../service/amount.services";
import { validateAmountBody,validateAmountId } from "../validators/amount.validators";

import {
  mapToAmountResponse,
  mapToAmountListResponse,
} from "./mappers/amount.mappers";

const router = Router();

router.get("/", (req, res) => {
  findAllAmounts()
    .then((amounts) => res.status(200).json(mapToAmountListResponse(amounts)))
    .catch((err) => res.status(500).send("Error fetching amounts"));
});

router.get("/:cardId",validateAmountId, (req, res) => {
  const id = req.params.cardId as string;
  getBalanceByCardId(id)
    .then((amount) => {
      if (!amount) return res.status(404).send("Amount record not found");
      res.status(200).json(mapToAmountResponse(amount));
    })
    .catch((err) => res.status(500).send("Error fetching amount record"));
});

router.get("/:cardId/total",validateAmountId, (req, res) => {
  const id = req.params.cardId as string;
  getTotalBalanceByCardId(id)
    .then((total) => {
      if (!total) return res.status(404).send("No records found");
      res.status(200).json(mapToAmountResponse(total));
    })
    .catch((err) => res.status(500).send("Error calculating total"));
});

router.post("/", validateAmountBody, (req, res) => {
  createAmount(req.body)
    .then((amount) => res.status(201).json(mapToAmountResponse(amount)))
    .catch((err) => res.status(500).send("Error creating amount record"));
});

router.put("/:cardId",validateAmountId, validateAmountBody, (req, res) => {
  const id = req.params.cardId as string;
  updateAmountFull(id, req.body)
    .then((amount) => {
      if (!amount) return res.status(404).send("Amount record not found");
      res.status(200).json(mapToAmountResponse(amount));
    })
    .catch((err) => res.status(500).send("Error updating amount"));
});

router.patch("/:cardId",validateAmountId, (req, res) => {
  const id = req.params.cardId as string;
  patchAmount(id, req.body)
    .then((amount) => {
      if (!amount) return res.status(404).send("Amount record not found");
      res.status(200).json(mapToAmountResponse(amount));
    })
    .catch((err) => res.status(500).send("Error patching amount"));
});

router.delete("/:cardId",validateAmountId, (req, res) => {
  const id = req.params.cardId as string;
  deleteAmount(id)
    .then((amount) => {
      if (!amount) return res.status(404).send("Amount record not found");
      res.status(200).send("Amount record deleted successfully");
    })
    .catch((err) => res.status(500).send("Error deleting amount record"));
});

export default router;
