const mongoose=require('../../../common/services/mogoose.services').mongoose
const Schema=mongoose.Schema
//common/services/mogoose.services.js
const userModelSchema=new Schema({
    username:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
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