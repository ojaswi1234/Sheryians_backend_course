const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose_connectors");

const ownerRouter = require("./routes/owner_router");
const userRouter = require("./routes/user_router");
const productRouter = require("./routes/product_router");

app.use(express.json());
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/owner",  ownerRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);


app.get('/login', (req, res) => {
    res.render('login');
})


app.listen(3000,() => {
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000");
})