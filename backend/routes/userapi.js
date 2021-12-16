const router = require("express").Router();
// const mongoose = require("mongoose");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const userController = require("../controllers/user.controllers")
// const createError = require("http-errors");
// const joi = require("@hapi/joi");
//const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("./validation");



// signup 
router.post("/register", userController.handelSignup);

// verify 
router.get("/verify/:id/:token", userController.handleVerify);

// async (req, res) => {
// Validate data

// const { error } = registerValidation(req.body);
// if (error) {
//   return res
//     .status(400)
//     .send({ value: false, message: error.details[0].message });
// }

// // check if user already exist
// console.log("here")
// const emailExist = await User.findOne({ email: req.body.email });
// if (emailExist) {
//   return res
//     .status(400)
//     .send({ value: false, message: "Email already exist" });
// }

// //Hash the password

// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(req.body.password, salt);

// if (!error && !emailExist) {
//   // Add User
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: hashedPassword,
//     formations: [],
//   });

//   await user
//     .save()
//     .then((doc) => {
//       console.log("User registred")
//       return res.status(200).send({ value: true, message: "User registred" });
//     })
//     .catch((err) => {
//       return res
//         .status(400)
//         .send({ value: false, message: "Error saving user" });
//     });
// }
// });


// login an user
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    // Validate data


    if (req.body.password === "admin" && req.body.email === "admin@admin.fr") {
      console.log("admin")
      return res.status(200).send({
        value: true,
        message: "User Admin",
        //token: authToken,
        id: 0,
        admin: true,

      });



    }
    else {
      const { error } = loginValidation(req.body);
      if (error) {
        return res
          .status(400)
          .send({ value: false, message: error.details[0].message });
      }

      // check email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        //return throw new Error('Something broke! 😱')
        return res.status(400).send({ value: false, message: "Email not found" });
      }

      // check password
      const validPass = await bcrypt.compare(req.body.password, user.password);


      if (!validPass) {
        return res
          .status(400)
          .send({ value: false, message: "Password is not correct" });
        //return next(new Error('password is not correct'))
      }
      if (user && validPass) {
        console.log("user");
        /*const authToken = jwt.sign({ id: user._id }, process.env.Secret_Token, {
          expiresIn: 3600,
       });
       //res.header('auth-token', authToken).send(authToken);
       if (!authToken) throw Error("Couldnt sign the token");*/
        return res.status(200).send({
          value: true,
          message: "User Found",
          //token: authToken,
          id: user._id,
          admin: false,
        });

      }
    }

  })
);


router.post("/getUserDetails", function (req, res) {
  var id = req.body.userid;
  var getUserDetails = User.find(
    { _id: id },
    {
      name: 1,
      email: 1,
      formations: 1,
    }
  );
  getUserDetails
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "OK",
        results: data,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.post("/getUsers", function (req, res) {


  var getUserDetails = User.find(
    {},
    {
      name: 1,
      email: 1,
      formations: 1,
    }
  );
  getUserDetails
    .exec()
    .then((data) => {

      res.status(200).json({
        message: "OK",
        results: data,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/addFormation", function (req, res) {
  var userid = req.body.userid;
  var nameFormation = req.body.nameformation;
  var description = req.body.description;
  var link = req.body.link;


  User.findById(userid, function (error, user) {
    user.formations.push({

      formationName: nameFormation,
      description: description,
      link: link,

    });

    user
      .save()
      .then((doc) => {
        res.status(200).send({
          value: true,
          message: "FORMATION ADDED",
        });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });
});

router.post("/DeleteFormation", function (req, res) {
  var userid = req.body.userid;
  var formationName = req.body.formationName;
  var link = req.body.link;

  User.updateOne(
    { _id: userid },
    { $pull: { formations: { formationName: formationName } } },
    { safe: true, multi: true },
    function (err, obj) {
      //do something smart
      res.status(200).send({
        value: true,
        message: "FORMATION DELETED",
      });
    }
  );
});

router.post("/UpdateFormation", function (req, res) {
  var userid = req.body.userid;
  var formationName = req.body.formationName;
  var link = req.body.link;
  var linkModified = req.body.linkModified;
  var nameformationModified = req.body.nameformationModified;
  var descriptionModified = req.body.descriptionModified;

  User.updateOne(
    { _id: userid, "formations.formationName": formationName },
    {
      $set: {
        "formations.$.description": descriptionModified,
        "formations.$.formationName": nameformationModified,
        "formations.$.link": linkModified
      }
    },

    function (err, doc) {
      res.status(200).send({
        value: true,
        message: "FORMATION UPDATED",
      });
    }
  );
});


module.exports = router;