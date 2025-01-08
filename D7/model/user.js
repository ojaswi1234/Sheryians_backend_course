const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/firstdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
});

module.exports = mongoose.model("User", userSchema);