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
  return await AmountModel.findById(cardId).lean();
}

export async function updateAmountFull(
  cardId: string,
  updateData: Partial<Amount>
) {
  return await AmountModel.findOneAndUpdate({ cardId: cardId }, updateData, {
    new: true,
  }).lean();
}

export async function patchAmount(cardId: string, updateData: Partial<Amount>) {
  return await AmountModel.findOneAndUpdate(
    { cardId: cardId },
    { $set: updateData },
    { new: true }
  ).lean();
}

export async function deleteAmount(cardId: string) {
  return await AmountModel.findOneAndDelete({ cardId: cardId }).lean();
}

export async function getTotalBalanceByCardId(cardId: string): Promise<Amount | null> {
    const amounts = await AmountModel.find({ cardId : cardId}).lean();
    
    if (amounts.length === 0) return null;

    const totalBalance = amounts.reduce((acc, curr) => acc + curr.balance, 0);

    return {
        cardId: cardId,
        balance: totalBalance,
        currency: amounts[0].currency,
        lastUpdated: new Date()
    };
}