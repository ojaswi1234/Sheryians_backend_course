const express  = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel= require('./model/user');
const postModel= require('./model/post');
const bcrypt = require('bcrypt');
app.set ('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/login', (req,res) => {
    res.render('login');
});

app.get('/profile', (req, res) => {

});

app.post('/register',(req, res) => {
    let { username, email, password} = req.body;
    let user = userModel.findOne({email: email});
    if(!user){return res.status(500).send("Error occured")}
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            userModel.create({
                username, 
                email,
                password: hash
            });
        });
    });

    let token = jwt.sign({email: email, userid: user._id,}, "shhhh");
    res.cookie('token', token);
    res.send('User Registered');
    res.redirect('/register');
})
app.get('/logout', (req,res) => {

});

function isLoggedIn(req, res, next) {

};
app.listen(3000 , () => {
    console.log('Server is running on port 3000');
});