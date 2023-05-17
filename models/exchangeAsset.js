const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema({
  wallet_address: { type: String, required: true },
  balance: { type: Number, required: true },
  platform: {
    crypto_id: { type: Number, required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
  },
  currency: {
    crypto_id: { type: Number, required: true },
    price_usd: { type: Number, required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
  },
});

const exchangeAsset = mongoose.model("exchangeAsset", exchangeSchema);
module.exports = exchangeAsset;
