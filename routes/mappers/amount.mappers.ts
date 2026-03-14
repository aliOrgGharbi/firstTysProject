import { Amount } from "../../service/amount.services";
import { AmountResponse } from "./types";

//export const mapToAmountResponse = (amount: Amount): AmountResponse => {
//  if (amount.balance || amount.lastUpdated) {
//    return {
/*      balance: amount.balance,
      lastUpdated: amount.lastUpdated,
    };
  }
  return {
    balance: null,
    lastUpdated: null,
  };
};*/


export const mapToAmountResponse = (amount: Amount): AmountResponse => {
    return {
        balance: amount.balance ?? null,
        lastUpdated: amount.lastUpdated ?? null,
      };
  };
  


export const mapToAmountListResponse = (
  amounts: Amount[]
): AmountResponse[] => {
  return amounts.map((amount) => mapToAmountResponse(amount));
};
