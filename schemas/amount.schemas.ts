import mongoose, { Schema } from 'mongoose';

export const AmountSchema = new Schema({
    cardId: { type: String, ref: 'Card', required: true},
    balance: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    lastUpdated: { type: Date, default: Date.now }
});

export const AmountModel = mongoose.model("Amount", AmountSchema);