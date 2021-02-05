const userModel=require('../../users/models/users.model')
const crypto=require('crypto')

exports.hasAuthValidFields=(req,res,next)=>{
    let errors=[]
    if (req.body) {
        if (!req.body.email) {
            errors.push({success:false,message:"Missing email field"})
        }
        if (!req.body.password) {
            errors.push({success:false,message:"Missing password field"})
        }
        if (errors.length) {
            return res.status(400).send({errors:errors.join(',')})
        }else{
            return next()
        }
    }else{
        return res.status(400).send({errors:{success:false,message:"missing the email and password fields"}})
    }
}

exports.isPasswordAndEmailMatch=(req,res,next)=>{
    userModel.getUserByEmail(req.body.email).then((result)=>{
        if (!result[0]) {
            res.status(404).send({});
        }else{
            let passFields=result[0].password.split('$')
            let salt=passFields[0]
            let hash=crypto.createHmac("sha512",salt).update(req.body.password).digest('base64')
            if (hash===passFields[1]) {
                req.body={
                    userId:result[0]._id,
                    username:result[0].username,
                    permissionLevel:result[0].permissionLevel,
                    email:result[0].email
                }
                console.log(req.body.permissionLevel)
                return next()
            }else{
                return res.status(400).send({errors:{success:false,message:"Invalid e-mail or password "}})
            }

        }
    });
}