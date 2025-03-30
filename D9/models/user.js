const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
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
    cart: {
        type: Array,
        default: [],
    },
    isadmin : {
        type: Boolean,
        default: false,
    },
    orders: {
        type: Array,
        default: [],
    },
    contact: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    address: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('user', userSchema);