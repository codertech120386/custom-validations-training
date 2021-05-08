const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const validator = require("../middlewares/validator");

const User = require("../models/user.model");

router.post("/", checkUserPost(), async (req, res) => {
  const errors = validationResult(req);
  console.log("errors", errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ data: errors.array() });
  }

  const user = await User.create(req.body);
  return res.status(201).json({ data: user });
});

function checkUserPost() {
  return (
    body("first_name").notEmpty().withMessage("first_name is required"),
    body("last_name").notEmpty().withMessage("last_name is required"),
    body("email")
      .isEmail()
      .withMessage("email is required and must be a valid email address"),
    body("gender")
      .isLength({ min: 3, max: 3 })
      .withMessage("gender is required and must be 3 characters long"),
    body("age").notEmpty().withMessage("age is required")
  );
}

module.exports = router;
