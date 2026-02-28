import { Card } from "../../service/cards.services";
import { CardResponse } from "./types";

export const mapToCardsResponse = (card: Card): CardResponse => {
  return {
    cardNumber: card.cardNumber,
    cardType: card.cardType,
  };
};

export const mapToCardsListResponse = (cards: Card[]): CardResponse[] => {
  return cards.map((card) => mapToCardsResponse(card));
};

