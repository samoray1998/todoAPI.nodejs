const userModel=require('../../users/models/users.model')

exports.checkUserId=(req,res,next)=>{
    if (req.body.userId) {
        userModel.getUserById(req.body.userId).then((result)=>{
            if (Object.keys(result._id).length!==0) {
                return next()
            }else{
                return res.status(400).send(
                    {
                        success:false,
                        message:"this user doesn't exist try to enter a valid user id"
                    }
                )
            }
        }).catch((err)=>{
            return res.status(500).send(
                {
                    success:false,
                    message:"this user doesn't exist try to enter a valid user id ",
                    error:err
                }
            )
        })
    }else{
        return res.status(400).send({
            success:false,
            message:"sorry you can't create a todo without a valid user id "
        })
    }
}