require('dotenv').config();
const express=require('express');
const dbConnect = require('./app/dbConnect/db');
const router = require('./app/router/userRoutes');
const app=express();
app.use(express.json());
app.use(router);
dbConnect().then((val)=>{
    app.listen(8000,()=>{
        console.log('server running');
    })
}).catch((err)=>{
    console.log(err);
})