const userModel=require('../models/users.model')
const crypto=require('crypto')

exports.insert=async(req,res)=>{
   // console.log(req.body)
    if(req.body){
        let slat=crypto.randomBytes(16).toString('base64')
        let hash=crypto.createHmac('sha512',slat).update(req.body.password).digest('base64')
        req.body.password=slat+'$'+hash
        return await userModel.createUser(req.body).then((result)=>{
            res.status(201).send({id:result._id})
        }).catch((err)=>{
            res.status(500).send({
                success:false,
                message:"op's it's looks that you some issues while you try to create this user",
                error:err
            })
        })
    }else{
        return res.status(400).send({
            success:false,
            message:"please fill all your data before you submit",
            
        })
    }
}