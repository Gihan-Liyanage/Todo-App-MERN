const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const userLoginRouter = express.Router();

/**
 * Login function
 * Success login will return a jwt token
 */
userLoginRouter.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(3)
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("Invalid username password combination!");

    // bcrypt is a npm module used for password hashing and validation
    const validation = await bcrypt.compare(req.body.password, user.password);

    if (!validation)
      return res.status(400).send("Invalid username password combination!");

    // jwt token generation
    const secret_key = process.env.SECRET_KEY;
    const jwt_tokens = JWT.sign(
      { _id: user._id, username: user.username, email: user.email },
      secret_key
    );

    res.send({ token: jwt_tokens });
  } catch (error) {
    res.status(500).send(err.message);
  }
});

module.exports = userLoginRouter;
