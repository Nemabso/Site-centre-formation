const mongoose = require("mongoose");

const uri = process.env.DB;

const connectDB = async () => {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB Connected!")
}

module.exports = connectDB;