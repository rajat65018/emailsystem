const express=require('express');
const validateJoiSchema = require('../middelware/validateJoiSchema');
const singupSchema = require('../JoiSchemas/signUp');
const { signup, login, sendEmail, verify } = require('../controller/userController');
const loginSchema = require('../JoiSchemas/loginJoiSchema');
const router=express.Router();
router.post('/signup',validateJoiSchema(singupSchema),signup);
router.post('/login',validateJoiSchema(loginSchema),login);
router.get('/sendemail',sendEmail);
router.get('/verify/',verify);
module.exports=router;