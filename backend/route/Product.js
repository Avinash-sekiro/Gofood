const express = require("express");
const route = express.Router();
const product = require("../modules/Product");
let jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

route.post("/product", async (req, res) => {
    let success = false;
    try {
        await mongoose.connection.db.collection('foodata').insertOne({
            categoryname: req.body.categoryname,
            name: req.body.name,
            image: req.body.image,
            option: req.body.option // Corrected this line
        }).then(user => {
            const data = {
                user: {
                    id: user.insertedId // Changed to insertedId
                }
            };

            const authToken = jwt.sign(data, "king");
            success = true;
            res.json({ success, authToken });
        }).catch(err => {
            console.log(err);
            res.json({ msg: "enter unique value" });
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = route;
