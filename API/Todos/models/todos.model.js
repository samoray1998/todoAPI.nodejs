const mongoose=require('../../../common/services/mogoose.services').mongoose
const Schema=mongoose.Schema

const TodoModelSchema=new Schema({
    userId:{
        type:String,
        required:[true,"enter a valid user Id"]
    },
    description:{
        type:String,
        required:[true,"please enter a todo wish"]
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const TodoModel=mongoose.model('todos',TodoModelSchema)

exports.createTodo=async(data)=>{
    let newTodo=new TodoModel(data)
    return await newTodo.save()
}

exports.getTodoByID=async(id)=>{
    return await TodoModel.findById(id).then((result)=>{
        if (result) {
            result =result.toJSON()
            delete result.__v
            return result
        }else{
            return {
                success:false,
                message:"it looks that this todo doesn't exist"
            }
        }
    }).catch((err)=>{
        return {
            success:false,
            message:"op's something went wrong while you try to get this todo",
            error:err
        }
    })
}


exports.getTodoAndUpdate=async(id,data)=>{
    return await TodoModel.findByIdAndUpdate(id,data)
}

exports.getTodoAndDelete=async(id)=>{
    return await TodoModel.findByIdAndDelete(id)
}

exports.getAllTodos=async()=>{
    return await TodoModel.find()
}