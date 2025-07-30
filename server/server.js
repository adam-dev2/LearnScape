const mongoose = require('mongoose');
const express =  require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const connectDB = require('./utils/connectDB');
require('./utils/passport')(passport)
require('dotenv').config();

const User = require('./models/User')

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE'],
}));
app.use(express.json());

connectDB();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL}),
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
    successRedirect: process.env.CLIENT_URL
}))

app.get('/auth/github',passport.authenticate('github',{scope:['profile','email']}));

app.get('/auth/github/callback',passport.authenticate('github',{
    failureRedirect: '/login',
    successRedirect: process.env.CLIENT_URL
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