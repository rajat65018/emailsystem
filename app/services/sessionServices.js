const sessionModel = require("../models/session");

const sessionService={};
sessionService.createSession=async(session)=>{
    return await sessionModel(session).save();
}
sessionService.findOneSession=async(searchQuery,projectionQuery)=>{
    return await sessionModel.findOne(searchQuery,projectionQuery);
}
module.exports=sessionService;