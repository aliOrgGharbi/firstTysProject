import { Router } from "express";
import { createCard, findAllCards, findCardsByUserId, deleteCard ,updateCard,patchCard, Card} from "../service/cards.services";
import { validateCardInput } from "../validators/cards.validators";
import { validateUserId } from "../validators/users.validators";

const router = Router();

router.get("/", (req, res) => {
    findAllCards()
        .then((cards) => res.status(200).json(cards))
        .catch((err) => res.status(500).send("Error fetching cards" ));
});
router.get("/:id", validateUserId, (req, res) => {
    const id = req.params.id as string;
    findCardsByUserId(id)
        .then((cards) => {
            if (!cards || cards.length === 0) return res.status(404).send("cards not found");
            res.status(200).json(cards);
        })
        .catch((err) => res.status(500).send("Error fetching user cards" ));
});
router.post("/", validateCardInput, (req, res) => {
    const cardData: Card = req.body;
    createCard(cardData)
        .then((card) => res.status(201).json(card))
        .catch((err) => res.status(500).json({ error: err.message }));
});
router.put("/:id",validateUserId,validateCardInput, (req, res) => {
    const id = req.params.id as string;
    updateCard(id, req.body)
        .then((card) => {
            if (!card) return res.status(404).send("Card not found");
            res.status(200).json(card);
        })
        .catch((err) => res.status(500).send("Error updating card"))
});
router.patch("/:id",validateUserId, (req, res) => {
    const id = req.params.id as string;
    patchCard(id, req.body)
        .then((card) =>{
            if (!card) return res.status(404).send("Card not found");
            res.status(200).json(card);
        })
        .catch((err) => res.status(500).send("Error patching card" ))
});
router.delete("/:id",validateUserId, (req, res) => {
    const id = req.params.id as string;
    deleteCard(id)
    .then((card) =>{
        if (!card) return res.status(404).send("Card not found");
        res.status(200).send("card deleted successfully");    })
    .catch((err) => res.status(500).send("Error deleting card" ))
});

export default router;