const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://adam222xyz:PbauxEHjkDWW7tT1@cluster0.i2sgm7s.mongodb.net/LearnScape',{
            useNewUrlParser: true,
            useUnifiedTopology: true
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