export interface CardResponse {
    cardNumber: string;
    cardType: string;
}

export interface UserResponse {
    email: string;
    createdAt: Date;
}

export interface AmountResponse {
    balance: number | null;
    lastUpdated: Date | null;
}
