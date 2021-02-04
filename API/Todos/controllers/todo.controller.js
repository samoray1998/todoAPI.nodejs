const TodoModel = require('../models/todos.model')

exports.insert = async (req, res) => {
    if (req.body) {
        return await TodoModel.createTodo(req.body).then((result) => {
            if (result) {
                res.status(201).send({ id: result._id })
            } else {
                res.status(400).send({ success: false, message: "sorry we can't find this item maybe the id isn't valid" })
            }
        }).catch((err) => {
            res.status(500).send({ success: false, message: "sorry something went wrong while you try to create a todo", error: err })
        })
    }
    else{
        return res.status(400).send({success:false,message:"sorry you can't create an empty todo "})
    }
}


exports.getTodoById=async(req,res)=>{
    return await TodoModel.getTodoByID(req.params.id).then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{
        res.status(500).send(err)
    })
}

exports.UpdateTodo=async(req,res)=>{
    if (req.body) {
        return await TodoModel.getTodoAndUpdate(req.params.id,req.body).then(()=>{
            res.status(200).send({
                success:true,
                message:"you have updated your todo successfully"
            })
        }).catch((err)=>{
            res.status(500).send({
                success:false,
                message:"sorry something went wrong while you trying to update your todo",
                error:err
            })
        })
    }else{
        return res.status(400).send({
            success:false,
            message:"you can't update this todo with null data"
        })
    }
}

exports.DeleteTodo=async(req,res)=>{
    return await TodoModel.getTodoAndDelete(req.params.id).then(()=>{
        res.status(200).send({
            success:true,
            message:"you have deleted your todo successfully"
        })
    }).catch((err)=>{
        res.status(500).send({
            success:false,
            message:"sorry something went wrong while you trying to delete your todo",
            error:err
        })
    })
}

exports.getAllTodos=async(req,res)=>{
    return await TodoModel.getAllTodos().then((results)=>{
        res.status(200).send(results)
    }).catch((err)=>{
        res.status(500).send({
            success:false,
            message:"sorry something went wrong while you trying to fetch your data",
            error:err
        })
    })
}