const express = require("express");
const router = express.Router();

// const { body, validationResult } = require("express-validator");

const validator = require("../middlewares/validator");

const User = require("../models/user.model");

router.post(
  "/",
  validator({
    first_name: ["required"],
    last_name: ["required"],
    email: ["required", "email"],
    gender: ["required", "minLength:3:characters"],
    age: ["required", "minLength:1:digits"],
    ip_address: ["minLength:3:digits|if:present"],
  }),
  async (req, res) => {
    const errors = {};
    Object.keys(req.errors).map((fieldName) => {
      if (req.errors[fieldName].length > 0)
        errors[fieldName] = req.errors[fieldName];
    });
    // errors: {first_name: ["first_name is required"]}
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ data: errors });
    }
    const user = await User.create(req.body);
    return res.status(201).json({ data: user });
  }
);

// function checkUserPost() {
//   return (
//     body("first_name").notEmpty().withMessage("first_name is required"),
//     body("last_name").notEmpty().withMessage("last_name is required"),
//     body("email")
//       .isEmail()
//       .withMessage("email is required and must be a valid email address"),
//     body("gender")
//       .isLength({ min: 3, max: 3 })
//       .withMessage("gender is required and must be 3 characters long"),
//     body("age").notEmpty().withMessage("age is required")
//   );
// }

module.exports = router;
