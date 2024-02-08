const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  companyName: String,
  companyGST: String,
  productName: String,
  productQuantity: String,
  message: String,
  date: String,
  time: String,
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
