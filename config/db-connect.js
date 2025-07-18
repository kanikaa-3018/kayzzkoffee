const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbgr = require("debug")("development:mongoose");

// Load env variables
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    dbgr("MongoDB connected successfully");
  })
  .catch((err) => {
    dbgr("MongoDB connection error:", err);
  });

module.exports = mongoose.connection;
