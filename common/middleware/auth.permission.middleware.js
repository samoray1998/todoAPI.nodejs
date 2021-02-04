const jwt=require('jsonwebtoken')
const jwt_secret=require('../config/env.config')['jwt_secret']

const Admin_Permission=1998

exports.minPermissionLevelRequired=(required_permission_level)=>{
    return (req,res,next)=>{
        let user_permission_Level=parseInt(req.jwt.permissionLevel)
        let userId=req.jwt.userId
      
        if (required_permission_level===0) {
            
            return next()
        }else{
            return res.status(403).send({success:false})
        }
    }
}

exports.onlySomeUserAndAdminCanDoThisAction=(req,res,next)=>{
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.userId;
    if (req.params&&req.params.userId&&userId==req.params.userId) {
        return next()
    }else{
        if (user_permission_level&Admin_Permission) {
            return next()
        } else {
            return res.status(403).send();
        }
    }
}

exports.someUsersCanDoThisAction=(req,res,next)=>{
    let userId=req.jwt.userId
    if (req.params.userId!==userId) {
        return next()
    }else{
        return res.status(400).send()
    }
}