import { ObjectId } from "mongoose";
import { CardModel } from "../schemas/cards.schemas";

export interface Card {
    userId: string;
    cardNumber: string;
    cardType: string;
    status: string;
    __v: number;
}

export async function findAllCards(): Promise<Card[]>{
    return await CardModel.find().lean();
}

export async function findCardById(cId: string): Promise<Card | null> {
    return await CardModel.findById(cId).lean();
}
export async function findCardsByUserId(uid: string):Promise<Card[]>  {
    return await CardModel.find({ userId: uid }).lean();
}

export async function createCard(cardData: Card): Promise<Card> {
    const newCard = new CardModel(cardData);
    return newCard.save();
}

export async function updateCard(id: string, updateData: Partial<Card>): Promise<Card | null> {
    return await CardModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
}
export async function patchCard(id: string, updateData: Partial<Card>) {
  return await CardModel.findByIdAndUpdate(
      id, 
      { $set: updateData }, 
      { new: true }
  ).lean();
}

export async function deleteCard(id: string):Promise<Card | null> {
    return await CardModel.findByIdAndDelete(id).lean();
}