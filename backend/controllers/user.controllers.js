const User = require("../models/user.model");
const Token = require("../models/token");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const sendEmail = require('../utils/emailSend')


const handelSignup = async (req, res) => {
    // Validate user
    // const suberr = registerValidation(req.body);
    // if (suberr) { return res.status(400).send({ value: false, message: "bad requiest !" }) }

    // check if user already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) { return res.status(400).send({ value: false, message: "Email already exist" }) }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (!emailExist) {
        // Add User
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        await user.save().then(() => {
            res.status(200).send({ value: true, message: "User registred" })
            console.log("User registred")
        }).catch(() => {
            return res.status(400).send({ value: false, message: "Error saving user" });
        })

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save()

        console.log("token saved !");
        const message = `${process.env.BASE_URL}/verify/${user._id}/${token.token}`;
        await sendEmail(user.email, user.name, message);
    }
}

// user verify 
const handleVerify = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        // if (user) return res.send("c'est bien user id !")
        if (!user) return res.status(400).send("invalid link !")

        const token = await Token.findOne({ userId: user._id, token: req.params.token });
        // if (token) return res.send("c'est bien token !")
        if (!token) return res.status(400).send("invalid link");

        await User.updateOne({ _id: user._id }, { $set: { verified: true } });
        await Token.findByIdAndRemove(token._id);
        res.send("email verify successfully")

    } catch (error) {
        res.status(400).send("une error de recouperer le mail")
    }
}


module.exports = { handelSignup, handleVerify }