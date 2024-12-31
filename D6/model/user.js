const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/firstdb', {useNewUrlParser: true, useUnifiedTopology: true});

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