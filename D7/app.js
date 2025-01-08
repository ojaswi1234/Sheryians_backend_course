const express =  require ('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) =>{
    res.render('index');
});
app.post("/create",async (req, res) => {
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(req.body.password, salt,async (err,hash) => {
            let {name, age,email,password } = req.body;
            let newuser = await userModel.create({
                name: name,
                age: age,
                email: email,
                password: hash,
            });
            let token = jwt.sign({email}, "sha@jdkin");
            res.cookie("token", token);
           res.redirect('/');
        });
    })
});

app.get('/login',(req,res) => {
   res.render('login');
});
app.post('/login', async (req,res) => {
    let user = await userModel.findOne({email: req.body.email});
    if(!user) return res.status(400).send("User Doen't exist");

    bcrypt.compare(req.body.password,user.password,(err, result) => {
        if(result){
            let token = jwt.sign({email: user.email}, "sha@jdkin");
            res.cookie("token", token);
            res.redirect('/read')
        }else[
            res.status(400).send("Invalid email or password")
        ]
    })
});

app.get('/logout', (res, req) => {
    res.cookie("token", "");
    res.redirect('/');
});
app.get('/read', (req,res) =>{
    res.render('read');
})

app.get('/edit/:_id', async (req,res) =>{
    res.send(users);
})

app.get('/update', (req,res) =>{
    res.render('update');
})
app.get('/delete', (req,res) =>{
    res.render('delete');
})

app.listen(3000, console.log("app is running on port 3000"));