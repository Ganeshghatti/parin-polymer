const userModel = require("../Model/User");
const formModel = require("../Model/Form");
// const productModel = require("../../../Model/Form");
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
const FormData = require("form-data");

const app = express();
app.use(cors());
app.use(bodyParser.json());

exports.register = async (req, res, next) => {
  const userdata = req.body;

  try {
    if (!validator.isEmail(userdata.email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    if (!validator.isStrongPassword(userdata.password)) {
      return res.status(400).json({
        error:
          "Weak password. Must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const existingUser = await userModel.findOne({ email: userdata.email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userdata.password, salt);

    const user = new userModel({
      username: userdata.username,
      email: userdata.email,
      phone: userdata.phone,
      password: hash,
      primary_address: userdata.primary_address,
      secondary_address: userdata.secondary_address,
      createdOn: moment().add(10, "days").calendar(),
      createdAt: moment().format("LT"),
    });

    const newUser = await user.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWTSECRET);

    res.status(200).json({
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      primary_address: newUser.primary_address,
      secondary_address: newUser.secondary_address,
      token: token,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send({ error: "Failed to register user" });
  }
};

exports.login = async (req, res, next) => {
  const userdata = req.body;
  console.log(userdata);
  try {
    if (!validator.isEmail(userdata.email)) {
      return res.status(400).send("Enter a valid email");
    }
    const existingUser = await userModel.findOne({ email: userdata.email });
    if (!existingUser) {
      return res.status(400).json({ error: "Wrong email or password" });
    }
    const match = await bcrypt.compare(
      userdata.password,
      existingUser.password
    );
    console.log(match);
    if (!match) {
      return res.status(400).json({ error: "Wrong email or password" });
    }

    const jwttoken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWTSECRET
    );

    res.status(200).json({
      email: existingUser.email,
      username: existingUser.username,
      token: jwttoken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Oops! Please try again later" });
  }
};

exports.GetAllProductNames = async (req, res, next) => {
  try {
    const allcourses = await courseModel.find();

    const simplifiedCourses = allcourses.map((course) => ({
      courseName: course.courseName || null,
      courseId: course.courseId || null,
      coursethumbnail: course.thumbnail || null,
      coursepayment: course.payment || null,
      courseamountInINR: course.amountInINR || null,
      coursetotalEnrollments: course.courseInfo
        ? course.courseInfo.totalEnrollments || null
        : null,
      coursetags: course.courseDetail ? course.courseDetail.tags || null : null,
      courserating: course.rating || null,
      courselanguage: course.language || null,
    }));

    res.status(200).json({ courses: simplifiedCourses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Oops! Please try again later" });
  }
};

exports.postForm = async (req, res, next) => {
  try {
    const { email, phone, name, query } = req.body;

    if (!validator.isMobilePhone(phone)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid phone number" });
    }

    const form = new formModel({
      date: moment().add(10, "days").calendar(),
      time: moment().format("LT"),
      email,
      phone,
      name,
      query,
    });

    await form.save();

    return res
      .status(200)
      .json({ message: "We will reach out to you as soon as possible" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops! Please try again later" });
  }
};

exports.MyAccount = async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    for (const item of user.coursesEnrolled) {
      const course = await courseModel.findOne({ courseId: item.courseId });

      if (course) {
        item.courseName = course.courseName;
        item.thumbnail = course.thumbnail;
      } else {
        console.error(`Course not found for courseId: ${item.courseId}`);
      }
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
