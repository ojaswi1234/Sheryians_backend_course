const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/firstdb', {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    content: String,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Post', postSchema);