const mongoose=require('../../../common/services/mogoose.services').mongoose
const Schema=mongoose.Schema

//email validator #regex
let validateEmail = function (email) {
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email)
}
//#

const userModelSchema=new Schema({
    username:{
        type:String,
        required: [true, "please enter your user name"],
        min: 4,
        max: 60,

    },
    email:{
        type:String,
        trim: true,
        lowercase: true,
        required: [true, "user email is required"],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please fill a valid email']
    },
    password:{
        type:String,
        required:true
    }
})

const UserModel=mongoose.model('users',userModelSchema)

exports.createUser=async(data)=>{
let newUser=new UserModel(data)
return await newUser.save()
}

exports.getUserById=async(id)=>{
    return await UserModel.findById(id).then((result)=>{
        if (result) {
            result=result.toJSON()
            delete result.__v
            return result
        }else{
            return {
                message:"it looks that the id is not valid"
            }
        }
    }).catch((err)=>{
        return {
            success:false,
            message:"op's something went wrong while you try to get this user",
            error:err
        }
    })
}

exports.getUserAndUpdate=async(id,data)=>{
return await UserModel.findByIdAndUpdate(id,data)
}

exports.getUserAndDelete=async(id)=>{
    return await UserModel.findByIdAndDelete(id)
}

exports.getAllUsers=async()=>{
    return await UserModel.find()
}

exports.getUserByEmail=async(email)=>{
    return await UserModel.find({email:email})
}