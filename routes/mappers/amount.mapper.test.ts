import { Amount } from "../../service/amount.services";
import { mapToAmountResponse } from "./amount.mappers";
import { AmountResponse } from "./types";

test("should map amount data correctly", () => {
    // given
    const mockAmount : Amount = {
        cardId: "card_xyz",
        balance: 1000,
        currency: "USD",
        lastUpdated: new Date()
    };

    // when
    const result: AmountResponse = mapToAmountResponse(mockAmount);

    // then
    expect(result.balance).toBe(mockAmount.balance);
    expect(result.lastUpdated).toBe(mockAmount.lastUpdated);
});

