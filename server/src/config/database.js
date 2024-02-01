const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected");
  } catch (error) {
    console.log("Failed" + error.message);
  }
};

module.exports = connectDatabase;
