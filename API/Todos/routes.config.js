const todoController=require('./controllers/todo.controller')
const userIdMiddleware=require('./middlewares/checkUser.meddleware')


exports.routConfig=function(app){
    app.post('/api/todo',[userIdMiddleware.checkUserId,todoController.insert])
    app.get('/api/todo/:id',[todoController.getTodoById])
    app.patch('/api/todo/:id',[todoController.UpdateTodo])
    app.delete('/api/todo/:id',[todoController.DeleteTodo])
    app.get('/api/todo',[todoController.getAllTodos])
}