const express = require('express')
const app = express()

// app.get(route, requestHandler)  In Case of Express, requestHandler is a MiddleWare Function

app.get("/",(req, res) =>{
    res.send("Champion mera bhai");
})

app.get("/profile",(req, res) =>{
    res.send("Champion uska coash");
})

app.listen(3000);