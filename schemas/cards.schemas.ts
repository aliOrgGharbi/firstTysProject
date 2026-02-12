import mongoose, { Schema } from 'mongoose';

export const CardSchema = new Schema({
    userId: { type: String, ref: 'User', required: true },
    cardNumber: { type: String, required: true },
    cardType: { type: String, enum: ['Visa', 'MasterCard'], default: 'Visa' },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' }
});

export const CardModel = mongoose.model("Card", CardSchema);