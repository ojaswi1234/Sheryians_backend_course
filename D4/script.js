const express = require('express');
const path = require('path');
const app = express();
//npm install cookie-parser
// Session Cookie : Cookie that expires when the user closes the browser i.e Server Bhul jata hai ki aap kon hai 
app.use (express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public'))); // Har request ke liye yha se static files dhundhna

app.get('/', (req, res) => {
    res.render("index");
});
/*
app.get('/profile/:name',(req, res) => {
    res.send(`Welcome ${req.params.name}`);
});

app.get('/author/:name/:age',(req, res) => { //DYNAMIC ROUTING 
    res.send(`Welcome ${req.params.name}  Your Age is ${req.params.age}`);
})
*/
app.listen(3000, () => {
    console.log("Server running ====>......");
});