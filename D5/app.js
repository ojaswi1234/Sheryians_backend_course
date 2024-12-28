const express = require('express');
const app = express();

const userModel = require('./usermodel');
app.get('/', (req, res) =>{
    res.send("Hello, Express")    
});


//CRUD OPERATIONS IN MONGO DB

app.get("/create", async (req, res) => {
    let createuser = await userModel.create(
        {
            name: "user",
            email: "user@gmail.com",
            username: "user123",
        }
    );
    res.send(createuser);
    console.log("User Created!");
});

app.get("/read", async (req, res) => {
    let users = await userModel.find(); // for displaying all users use find(), and for printing only 1 use  findOne() function
    res.send(users);
});

app.get("/update", async (req, res) => {
    let updateduser = await userModel.findOneAndUpdate({username: "ojaswi123"},{name: "ojaswi bhardwaj"}, {new: true});
    res.send(updateduser);
}); 

app.get("/delete", async (req,res) => {
     let deleteduser = await userModel.findOneAndDelete({name:"user"});
     res.send(deleteduser);
})

  

app.listen(3000);