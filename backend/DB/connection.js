const mongoose = require("mongoose");

const uri = "mongodb+srv://nemabso:dbNemabso@cluster0.1a1xd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB Connected!")
}

module.exports = connectDB;