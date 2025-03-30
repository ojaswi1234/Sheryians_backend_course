const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        default: [],
    },
    picture: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    gstin: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('owner', ownerSchema);