const adminModel = require("../Model/Admin");
const productModel = require("../Model/Product");
const formModel = require("../Model/Form");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios");
const moment = require("moment");
const { sendErrorEmail } = require("../utils/Errormail");
const uuid = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

exports.CreateProduct = async (req, res, next) => {
  const {
    productName,
    amountInINR,
    productDescription,
    dimension,
    specifications,
    quantityAvailable,
  } = req.body;

  try {
    const prefix = "PRODUCT";
    const uniquePart = uuid.v4().replace(/-/g, "").substr(0, 8);
    const productId = `${prefix}${uniquePart}`;

    const newProduct = new productModel({
      productName,
      amountInINR,
      productDescription,
      dimension,
      specifications,
      quantityAvailable,
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      createdBy: req.admin.email,
      productId,
    });

    await newProduct.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.GetAllProducts = async (req, res, next) => {
  try {
    const allproducts = await productModel.find();
    res.status(200).json({ products: allproducts });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.EditProduct = async (req, res, next) => {
  const { productId } = req.params;
  const updatedProductDetails = req.body;
  try {
    const product = await productModel.findOne({ productId });

    if (!product) {
      return res
        .status(404)
        .json({ error: `Product with ID ${productId} not found` });
    }
    product.productName = updatedProductDetails.productName;
    product.productDescription = updatedProductDetails.productDescription;
    product.amountInINR = updatedProductDetails.amountInINR;
    product.lastUpdate = moment().format("MMMM Do YYYY, h:mm:ss a");
    product.specifications = updatedProductDetails.specifications;
    product.quantityAvailable = updatedProductDetails.quantityAvailable;
    product.dimension = updatedProductDetails.dimension;

    await product.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.DeleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const deletedproduct = await productModel.findOneAndDelete({productId});
    console.log(deletedproduct);
    if (!deletedproduct) {
      return res
        .status(404)
        .json({ error: `Product with ID ${productId} not found` });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedproduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.GetFormData = async (req, res, next) => {
  try {
    const formData = await formModel.find();
    res.status(200).json({ formData: formData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.GetAllUsers = async (req, res, next) => {
  try {
    const allusers = await userModel.find();
    res.status(200).json({ users: allusers });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// exports.AdminLogin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     const admin = new adminModel({
//       email: email,
//       password: hash,
//     });

//     const newadmin = await admin.save();
//     console.log("object");
//     res.status(200).json({
//       email: newadmin.email,
//     });
//   } catch (error) {
//     res.status(500).send({ error: "Failed to register user" });
//   }
// };
