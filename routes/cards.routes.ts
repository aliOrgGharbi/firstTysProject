import { Router } from "express";
import {
  createCard,
  findCardById,
  findAllCards,
  deleteCard,
  updateCard,
  patchCard,
  Card,
} from "../service/cards.services";
import { validateCardInput,validateCardId } from "../validators/cards.validators";
import {
  mapToCardsResponse,
  mapToCardsListResponse,
} from "./mappers/cards.mappers";

const router = Router();

router.get("/", (req, res) => {
  findAllCards()
    .then((cards) => res.status(200).json(mapToCardsListResponse(cards)))
    .catch((err) => res.status(500).send("Error fetching cards"));
});

router.get("/:id", validateCardId, (req, res) => {
  const id = req.params.id as string;
  findCardById(id)
    .then((card) => {
      if (!card) return res.status(404).send("Card not found");
      res.status(200).json(mapToCardsResponse(card));
    })
    .catch((err) => res.status(500).send("Error fetching card"));
});

router.post("/", validateCardInput, (req, res) => {
  const cardData: Card = req.body;
  createCard(cardData)
    .then((newCard) => {
      res.status(201).json(mapToCardsResponse(newCard));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.put("/:id", validateCardId, validateCardInput, (req, res) => {
  const id = req.params.id as string;
  updateCard(id, req.body)
    .then((updatedCard) => {
      if (!updatedCard) return res.status(404).send("Card not found");
      res.status(200).json(mapToCardsResponse(updatedCard));
    })
    .catch((err) => res.status(500).send("Error updating card"));
});

router.patch("/:id", validateCardId, (req, res) => {
  const id = req.params.id as string;
  patchCard(id, req.body)
    .then((patchedCard) => {
      if (!patchedCard) return res.status(404).send("Card not found");
      res.status(200).json(mapToCardsResponse(patchedCard));
    })
    .catch((err) => res.status(500).send("Error patching card"));
});

router.delete("/:id", validateCardId, (req, res) => {
  const id = req.params.id as string;
  deleteCard(id)
    .then((deletedCard) => {
      if (!deletedCard) return res.status(404).send("Card not found");
      res.status(200).send("Card deleted successfully");
    })
    .catch((err) => res.status(500).send("Error deleting card"));
});

export default router;
