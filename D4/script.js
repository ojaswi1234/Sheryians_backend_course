const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
//npm install cookie-parser
// Session Cookie : Cookie that expires when the user closes the browser i.e Server Bhul jata hai ki aap kon hai 
app.use (express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public'))); // Har request ke liye yha se static files dhundhna

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index", {files:files});
    });
   
});

app.get('/files/:filename', (req, res) => {
   fs.readFile(`./files/${req.params.filename}`,(err, filedata) => {
    res.render('show');
   });
}); 
app.post('/create',(req, res) =>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) =>{
        res.redirect("/");
    })
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