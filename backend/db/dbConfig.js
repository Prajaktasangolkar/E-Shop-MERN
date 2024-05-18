const mongoose = require("mongoose");
require("dotenv").config();
async function connectDB() {
  const url = `mongodb+srv://admin:admin@cluster0.2cicexc.mongodb.net/eshop`;

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected: ${url}`);
  } catch (err) {
    console.error('error in mb',err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
}

module.exports = connectDB;