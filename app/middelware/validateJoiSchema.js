const Joi=require('joi');
function validateJoiSchema(Schema){
    return (req,res,next)=>{
        if(Schema.body){
            const result=Joi.object(Schema.body).validate(req.body);
            if(result.error){
                return res.json({message:result.error.message});
            }
        }
        if(Schema.headers){
            const result=Joi.object(Schema.headers).validate(req.headers);
            if(result.error){
                return res.json({message:result.error.message});
            }
        }
        if(Schema.params){
            const result=Joi.object(Schema.params).validate(req.params);
            if(result.error){
                return res.json({message:result.error.message});
            }
        }
        next();
    }
}
module.exports=validateJoiSchema;