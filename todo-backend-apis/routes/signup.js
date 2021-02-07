/**
 * Joi password validation
 * pre existence of the user
 * creating the user 
 * hashing the password (bcrypt)
 * save user 
 */

const Joi = require('joi');
const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

const userSignInRouter = express.Router();

userSignInRouter.post('/', async (req, res) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(3)
    })
    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send("User with that email already exists...");

        const { username, email, password } = req.body;

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        // res.send({"token": jwt_tokens});
        res.send("User Created Successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
})

module.exports = userSignInRouter;


