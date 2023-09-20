//console.log("jay shree ram");
const express = require('express');
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");
const db = require("./src/data/db");
const userRout = require('./src/Rout/user');
const articleRout = require('./src/Rout/article');
const cartRout = require('./src/Rout/cart');


app.use(express.json());
app.use("/api", userRout);
app.use("/api", articleRout);
app.use("/api", cartRout);

 
const corsOptions = {
    origin: 'http://localhost:5173', // Remplacez par votre origine réelle
};

app.use(cors())
app.listen(5000, () => {
    console.log("server starded")
})