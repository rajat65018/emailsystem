const Joi=require('joi');
const loginSchema={
    body:{
        email:Joi.string().email().required().description('user email'),
        password:Joi.string().required().description('user password')
    }
}
module.exports=loginSchema;