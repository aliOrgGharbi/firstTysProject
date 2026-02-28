import { Amount } from "../../service/amount.services";
import { AmountResponse } from "./types";

export const mapToAmountResponse = (amount: Amount): AmountResponse => {
    return {
        balance: amount.balance,
        lastUpdated: amount.lastUpdated
    };
};

export const mapToAmountListResponse = (amounts: Amount[]): AmountResponse[] => {
    return amounts.map((amount) => mapToAmountResponse(amount));
};