const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/firstdb', {useNewUrlParser: true, useUnifiedTopology: true});
const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});


module.exports = mongoose.model('user', userSchema);