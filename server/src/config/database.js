const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDatabase = async () => {
  console.log(process.env.MONGODB_CONNECT_URI);
  try {
    await mongoose.connect(
      "mongodb+srv://ganeshghatti6:lLiTVKJQR52hu4ba@ganeshghatti6.dwcfapl.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connected");
  } catch (error) {
    console.log("Failed" + error.message);
  }
};

module.exports = connectDatabase;
