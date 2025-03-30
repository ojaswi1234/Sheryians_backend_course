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

app.get("/test",(req, res) => {
    res.render('test');
})

app.get('/login', (req,res) => {
    res.render('login');
});
app.post('/login', async (req, res) => {
    let user = await userModel.findOne({email: req.body.email});
    if(!user) return res.status(400).send("User Not Found!");
    else{
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(result){
                let token = jwt.sign({email: user.email}, "se#ret");
                res.cookie("token", token);
                res.redirect("/profile");
            }else{
                res.send("Invalid Email or password! Please Try Again")
            }
        }); 
    }
});

app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    if (!user) return res.status(400).send("User Not Found!");

    let post = await postModel.create({
        user: user._id,
        content: req.body.content,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

app.get('/profile',isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render('profile', {user});
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
});

app.get('/logout', (res, req) => {
    res.cookies("token", "");
    res.redirect('/');
});

app.get('/edit/:id',isLoggedIn, async (req, res) => {
   let post = await postModel.findOne({id: req.params.id});
    res.render('edit', {post});
});

app.post('/edit/:id',isLoggedIn, async(req, res) => {
    let post = await postModel.findOneAndUpdate({id: req.params.id}, {content: req.body.content});
    res.redirect('/profile');
});

app.get('/delete/:id',isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndDelete({id: req.params.id});
    res.redirect('/profile');
});

function isLoggedIn(req, res, next) {
    if(req.cookies.token === ""){return res.redirect("/login"); alert("Please Login First");}

    else{
        let data = jwt.verify(req.cookies.token, "se#ret");
        req.user = data;
        next();
    }
};
app.listen(3000 , () => {
    console.log('Server is running on port 3000');
    console.log("app link: http://localhost:3000");
});