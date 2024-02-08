const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  amountInINR: {
    type: Number,
  },
  productDescription: {
    type: String,
  },
  dimension: {
    type: String,
  },
  specifications: [String],
  createdAt: String,
  createdBy: String,
  lastUpdate: String,
  quantityAvailable: {
    type: Number,
  },
  productId: {
    type: String,
    unique: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
