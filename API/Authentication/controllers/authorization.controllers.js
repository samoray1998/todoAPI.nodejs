const jwt_secret=require('../../../common/config/env.config').jwt_secret
const   jwt=require('jsonwebtoken')
const crypto=require('crypto')
const uuid=require('uuid')

exports.LoginRequest=(req,res)=>{
    try {
        let refreshID=req.body.userId+jwt_secret
        let salt=crypto.randomBytes(16).toString('base64')
        let hash=crypto.createHmac('sha512',salt).update(refreshID).digest('base64')
        req.body.refreshKey=salt
        let token=jwt.sign(req.body,jwt_secret)
        let b=Buffer.from(hash)
        let refreshToken=b.toString('base64')
        res.status(201).send({accessToken:token,refreshToken:refreshToken})
    } catch (error) {
        res.status(500).send({errors: err});
    }
}


exports.refreshToken=(req,res)=>{
    try {
        req.body=req.jwt
        let token=jwt.sign(req.body,jwt_secret)
        res.status(201).send({id: token});
    } catch (error) {
        res.status(500).send({errors: err});
    }
}

