const UserModel=require('../models/users.model')

//this function or middleware will check if the user email is used by anther user in database

exports.isEmailExist=async(req,res,next)=>{
    if (!req.body.email) {
        return res.status(404).send({errors:"the email field is empty"})
     }else{
         UserModel.getUserByEmail(req.body.email).then((result)=>{
             
            
             if(Object.keys(result).length===0){
                 return next()
             }else
             return res.status(404).send({errors:{
                 success:false,
                 message:'sorry this user is already exist',
                 user:result
             }})
         }).catch((err)=>{
             return res.status(500).send({errors:err})
         })
     }
}