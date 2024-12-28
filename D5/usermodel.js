const  mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/userdb');

const userSchema = mongoose.Schema({
    name: {type : String, required: true},
    email: {type : String, required: true, unique: true},
    username: {type : String, required: true, unique: true},
});

module.exports = mongoose.model("User",userSchema);