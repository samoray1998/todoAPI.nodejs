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