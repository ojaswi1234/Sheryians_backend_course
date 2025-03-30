const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    bgColor: {
        type: String,
        default: "white",
    },
    panelColor:{
        type: String,
        default: "white",
    }

});

module.exports = mongoose.model('product', productSchema);