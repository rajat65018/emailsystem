const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { SECRETKEY } = require("../../config");
const { createSession, findOneSession } = require("../services/sessionServices");
const { findOneUser, createUser } = require("../services/userServices");
const MESSAGES = require("../utils/messages");
const nodemailer=require('nodemailer');
const generateOtp = require('../helper');
const sendEmail = require('../helper');

const userController={};
userController.signup=async(req,res)=>{
    const payload=req.body;
    const userExist=await findOneUser({email:payload.email});
    if(userExist){
        return res.json({message:MESSAGES.EMAIL_EXIST});
    }
    payload.password=await bcrypt.hash(payload.password,8);
    const user=await createUser(payload);
    await sendEmail(req,res);
    const otp=generateOtp;
    const token=jwt.sign({otp:otp},SECRETKEY);
    const session={
        userId:user._id,
        token:token,
        tokenType:'otp'
    };
    await createSession(session);
    res.json({message:session});
}

userController.login=async(req,res)=>{
    const payload=req.body;
    const user=await findOneUser({email:payload.email});
    if(!user||!bcrypt.compareSync(payload.password,user.password)){
        return res.json({message:MESSAGES.INVALID_CREDENTIALS});
    }
    const token=await findOneSession({userId:user._id});
    res.json({
        id:user._id,
        token:token.token
    });
}
userController.sendEmail=async(req,res)=>{
    const createTestAccount=await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'rb465629@gmail.com',
            pass: 'yfpusxosxysstdgz'
        }
    });  
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <rb465629@gmail.com>', // sender address
        to: "rb465629@gmail.com", // list of receivers
        subject: "otp verification", // Subject line
        text: generateOtp().toString() // plain text body
      });
      
    res.json(info);
}

userController.verify=async(req,res)=>{
    const otp=req.body.otp;
    const userId=req.body.userId;
    // const token=jwt.sign({otp:otp},SECRETKEY);
    const tokenOtp=await findOneSession({userId:userId,tokenType:'otp'});
    const otp1=jwt.verify(tokenOtp.token,SECRETKEY);
    console.log(tokenOtp);
    console.log(otp1);
    
}

module.exports=userController;