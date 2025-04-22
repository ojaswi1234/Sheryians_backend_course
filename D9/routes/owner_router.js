const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner");

router.get('/', (req, res) => {
    res.send('owner_home');
})


router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
        return res.status(503).send("User already exists!");
    }
    let {name, email, password,gstin} = req.body;
    let newOwner = await ownerModel.create({
        name,
        email,
        password,
        gstin
    });
    res.status(201).send(newOwner);
})


module.exports = router;