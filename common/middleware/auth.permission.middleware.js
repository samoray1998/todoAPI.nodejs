const jwt=require('jsonwebtoken')
const jwt_secret=require('../config/env.config')['jwt_secret']
const env=require('../config/env.config')


const Admin_Permission=1998

exports.minPermissionLevelRequired=(required_permission_level)=>{
    return (req,res,next)=>{
        let user_permission_Level=parseInt(req.jwt.permissionLevel)
        let userId=req.jwt.userId
      console.log('test111 '+user_permission_Level)

        
        switch (required_permission_level) {
            case env.permissionLevel.SimpleUser:
                return next();
                break;
            case env.permissionLevel.PaidUser:
                if (user_permission_Level == env.permissionLevel.PaidUser || user_permission_Level === Admin_Permission) {
                    return next();
                } else {
                    return res.status(403).send({ success: false, message: "you are not authorized" })
                }
                break;
            case env.permissionLevel.Admin_Permission:
                if (user_permission_Level === env.permissionLevel) {
                    return next()
                } else {
                    return res.status(403).send({ success: false, message: "you are not authorized" })

                }
                break;
            default:
                return res.status(403).send({ success: false, message: "you are not authorized" })

                break;
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