const userModel=require('../models/users.model')
const crypto=require('crypto')

//this function is responsible for inserting new users
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

//this function is responsible for getting users by there unique id

exports.getUserById=async(req,res)=>{
    if(req.params.userId){
        return await userModel.getUserById(req.params.userId).then((result)=>{
            res.status(200).send(result)
        }).catch((err)=>{
            res.status(500).send({errors:err})
        })
    }
}

//this function is responsible for updating user data

exports.UpdateUser=async(req,res)=>{
    if (req.body) {
        
        return await userModel.getUserAndUpdate(req.params.userId,req.body).then((result)=>{
            if (result) {
                res.status(200).send({
                    success:true,
                    message:"this user is updated successfully .."
                })
            }else{
                res.status(400).send({
                    success:false,
                    message:"this user does not exist "
                })
            }
        }).catch((err)=>{
            res.status(500).send({
                success:false,
                message:"op's something went wrong while you try to update this user",
                error:err
            })
        })
    }else{
        return res.status(400).send({
            success:false,
            message:"you can't update this user without a valid data "
        })
    }
}



//this function is responsible for deleting users
exports.DeleteUser=async(req,res)=>{
    if (req.params.id) {
        return await userModel.getUserAndDelete(req.params.userId).then(()=>{
            res.status(200).send({
                success:true,
                message:"this user is deleted successfully .."
        })
        }).catch((err)=>{
            res.status(500).send({
                success:false,
                message:"op's something went wrong while you try to delete this user",
                error:err
            })
        })
        
    }else{
        return res.status(400).send({
            success:false,
            message:"you can't delete this user without a valid id",
           
        })
    }
}


//this function is about getting a list of users

exports.getAllUsers=async(req,res)=>{
    return await userModel.getAllUsers().then((results)=>{
        res.status(200).send(results)
    }).catch((err)=>{
        res.status(500).send({
            success:false,
            message:"op's something went wrong while you trying to fetch user data",
            error:err
        })
    })
}