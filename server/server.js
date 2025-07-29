const mongoose = require('mongoose');
const express =  require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const connectDB = require('./utils/connectDB');
require('./utils/passport')(passport)

const User = require('./models/User')

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET','POST','PUT','DELETE'],
}));
app.use(express.json());

connectDB();

app.use(session({
    secret: 'SESSION-SECRET',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://adam222xyz:PbauxEHjkDWW7tT1@cluster0.i2sgm7s.mongodb.net/LearnScape'}),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.status(200).json({
        message: 'Server is up running healthy'
    })
})

app.get('/auth/google', passport.authenticate('google',{
    scope:['profile','email']
}));

app.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect: '/login',
    successRedirect: 'http://localhost:5173/'
}))

app.get('/auth/me',(req,res) => {
    if(req.isAuthenticated()){
        return res.status(200).json({
            user: req.user
        })
    } else {
        return res.status(401).json({
            message: 'UnAuthorized'
        })
    }
})

app.get('/auth/logout',(req,res) => {
    req.logout((err) => {
        if(err) return res.status(500).json({message: 'Logout Failed', error: err.message});

        res.status(200).json({ message: 'Logout successful'});
    })
})

app.listen(port,()=>{
    console.log(`Server is listening on port: ${port}`);
})