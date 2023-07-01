const userModel = require("../models/userModel");

const userService={};
userService.createUser=async(payload)=>{
    return await userModel(payload).save();
}
userService.findAndUpdateUser=async(searchQuery,updateQuery)=>{
    return await userModel.findAndUpdate(searchQuery,updateQuery);
}
userService.findOneUser=async(searchQuery,projectionQuery)=>{
    return await userModel.findOne(searchQuery,projectionQuery);
}
module.exports=userService;