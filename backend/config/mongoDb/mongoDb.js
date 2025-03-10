const { MongoClient } = require('mongodb');
const dotenv=require('dotenv')
const mongoose = require('mongoose');
const mongoURI= process.env.MONGODB_URI;




const db=async=()=>{

    mongoose.connect(mongoURI)
    .then(() => {
        ('MongoDB connected successfully!');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
    
}

module.exports=db;
