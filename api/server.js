const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const port = 5000;
mongoose.set("strictQuery", false)


dotenv.config()

//! Connect to MongoDB
const connect = async () => {
    try{
         await mongoose.connect(process.env.MONGO_URI)
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