const nodemailer=require('nodemailer');
const { SMTPMAIL, SMTPPASSWORD } = require('../../config');
function generateOtp(){
    return 222
}
async function sendEmail(req,res){
    const transporter=await nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user: SMTPMAIL,
            pass: SMTPPASSWORD
        }
    })
    const sendMailOption={
        from:SMTPMAIL,
        to:req.body.email,
        subject:'otp',
        text:generateOtp().toString()
    }
    await transporter.sendMail(sendMailOption,function(error,info){
        if(error){
            console.log(error);
            return res.json({message:error});
        }
        else{
            console.log(info);
        }
    });
}
module.exports=sendEmail;
module.exports=generateOtp;