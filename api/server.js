const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
mongoose.set("strictQuery", true)

//! Connect to MongoDB
const connect = async () => {
    try{
         await mongoose.connect("mongodb+srv://EcaniVRL:Kv5033.,@cluster0.v1z0hbp.mongodb.net/?retryWrites=true&w=majority")
         console.log('MongoDB connected');
    }catch(error){
        console.error('MongoDB connection error', error);
    }
}
 

app.get('/', (req, res) => {res.send('Hello World!');});

app.listen(port, () => {
    connect();
    console.log(`Example app listening at on port ${port}`);
    });