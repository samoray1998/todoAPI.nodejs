const jwt=require('jsonwebtoken')
const jwt_secret=require('../config/env.config').jwt_secret
const crypto=require('crypto')


exports.verifyRefreshedBodyField=(req,res,next)=>{
if (req.body&&req.body.refreshToken) {
    return next()
}else{
    return res.status(400).send({errors:{success:false,message:"you need to pass refreshToken field"}})
}
}

exports.validRefreshNeeded=(req,res,next)=>{
    let b=Buffer.from(req.body.refreshToken)
    let refreshToken=b.toString()
    let hash=crypto.createHmac('sha512',req.jwt.refreshKey).update(req.jwt.userId+jwt_secret).digest('base64')
    if (hash===refreshToken) {
        req.body=req.jwt
        return next()
    }else{
        return res.status(400).send({errors:{success:false,message:'Invalid refresh token'}});
    }
}

exports.validJWTNeeded=(req,res,next)=>{
    if(req.headers['authorization']){
        try {
            let author=req.headers['authorization'].split(' ')
            if (author[0]!=='Samoray') {
                return res.status(401).send();
            }else{
                req.jwt=jwt.verify(author[1],jwt_secret)
                return next()
            }
        } catch (err) {
            return res.status(403).send();
        }
    }else{
        return res.status(401).send()
    }
}