
const mongoose = require("mongoose");
//require('mongoose-type-url');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        trim: true,
        required: true,

        //minlength: [3, "Fist name too short"]
    },

    password: {
        type: String,
        required: true,
        //maxlength: [20, "Password too long"],
        //minlength: [6, "Password too short"]
    },
    email: {
        type: String,
        required: true,

        //minlength: [6, "Email invalid"]
    },
    formations: {
        type: Array,
        default: [],
    },

});

// virtual fields goes here

// compile and export model from mongoose.Schema
const User = mongoose.model("User", userSchema);
module.exports = User;