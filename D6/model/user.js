const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/firstdb');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    }
});
module.exports =  mongoose.model('user', userSchema);