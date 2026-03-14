import { Amount } from "../../service/amount.services";
import { mapToAmountResponse, mapToAmountListResponse } from "./amount.mappers";
import { AmountResponse } from "./types";

test("should  map amount data correctly", () => {
  // given
  const mockAmount: Amount = {
    cardId: "card_xyz",
    balance: 1000,
    currency: "USD",
    lastUpdated: new Date(),
  };

  // when
  const result: AmountResponse = mapToAmountResponse(mockAmount);

  // then
  expect(result.balance).toBe(mockAmount.balance);
  expect(result.lastUpdated).toBe(mockAmount.lastUpdated);
});

test("should map all amount data correctly", () => {
  // given
  const mockAmount: Amount[] = [
    {
      cardId: "card_xyz",
      balance: 1000,
      currency: "USD",
      lastUpdated: new Date(),
    },
    {
      cardId: "card_xyz",
      balance: 1000,
      currency: "USD",
      lastUpdated: new Date(),
    },
  ];

  // when
  const result: AmountResponse[] = mapToAmountListResponse(mockAmount);

  // then
  expect(result[0].balance).toBe(mockAmount[0].balance);
  expect(result[0].lastUpdated).toBe(mockAmount[0].lastUpdated);
  expect(result[1].balance).toBe(mockAmount[1].balance);
  expect(result[1].lastUpdated).toBe(mockAmount[1].lastUpdated);
});

test("should map all amount data correctly", () => {
  // given
  const mockAmount: Amount[] = [];

  // when
  const result: AmountResponse[] = mapToAmountListResponse(mockAmount);

  // then
  expect(result).toStrictEqual([]);
});

test("should map amount data correctly", () => {
  // given
  const mockAmount: Amount = {} as Amount;

  // when
  const result: AmountResponse = mapToAmountResponse(mockAmount);

  // then
  expect(result.balance).toBe(null);
  expect(result.lastUpdated).toBe(null);
});
