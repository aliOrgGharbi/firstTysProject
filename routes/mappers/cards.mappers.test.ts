import {mapToCardsResponse} from "./cards.mappers";
import { Card } from "../../service/cards.services";
import { CardResponse } from "./types";


test("should map user data correctly",()=>{
    //given
    const card : Card = {
        userId: "12345",
        cardNumber:"1234567890",
        cardType:"Visa",
        status:"income",
        __v:0
    };

    //when
    const result : CardResponse = mapToCardsResponse(card);

    //then
    expect(result.cardNumber).toBe(card.cardNumber);
    expect(result.cardType).toBe(card.cardType);
})