import { AmountModel } from "../schemas/amount.schemas";

export interface Amount {
    cardId: string;
    balance: number;
    currency: string;
    lastUpdated: Date;
}

export async function createAmount(amountData: Amount) {
    const newAmount = new AmountModel(amountData);
    return await newAmount.save();
}

export async function findAllAmounts() {
    return await AmountModel.find().lean();
}

export async function getBalanceByCardId(cardId: string) {
    return await AmountModel.findOne({ cardId }).lean();
}

export async function updateAmountFull(cardId: string, updateData: Partial<Amount>) {
    return await AmountModel.findByIdAndUpdate(
        { cardId },
        updateData,
        { new: true }
    ).lean();
}

export async function patchAmount(cardId: string, updateData: Partial<Amount>) {
    return await AmountModel.findByIdAndUpdate(
        { cardId },
        { $set: updateData },
        { new: true }
    ).lean();
}

export async function deleteAmount(cardId: string) {
    return await AmountModel.findByIdAndDelete(cardId).lean();
}