const express = require('express')
const app = express()

// app.get(route, requestHandler)  In Case of Express, requestHandler is a MiddleWare Function

app.use((req, res, next) =>{
    console.log("MiddleWare Function first time");
    next();
});

app.use((req, res, next) =>{
    console.log("MiddleWare Function second time");
    next();
});

app.get("/",(req, res) =>{
    res.send("Champion mera bhai");
});

app.get("/profile",(req, res, next) =>{
    return next(new  Error("Something went wrong"));
});
app.use((err, req, res, next) => { //PUT THIS IN THE END OF THE CODE
    console.error(err.stack);
    res.status(500).send("Error Occured");
})
app.listen(3001);