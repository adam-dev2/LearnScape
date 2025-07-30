const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            }).then(()=>{
                console.log('MongoDB connected successfully');
            }).catch((err)=>{
                console.error('MongoDB connection error:', err);
        })
    } catch(err) {
        console.error(`Error while connecting to db: ${err.message}`)
    }
}

module.exports = connectDB;