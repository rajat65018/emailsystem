const mongoose=require('mongoose');
const sessionSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    tokenType:{
        type:String,
        default:"user"
    }
},{timestamps:true});
const sessionModel=mongoose.model('session',sessionSchema);
module.exports=sessionModel;