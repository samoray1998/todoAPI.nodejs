const todoController=require('./controllers/todo.controller')
const userIdMiddleware=require('./middlewares/checkUser.meddleware')

const permissionMiddleware=require('../../common/middleware/auth.permission.middleware')
const validationMiddleware=require('../../common/middleware/auth.validation.middleware')
const envConfig=require('../../common/config/env.config')

const ADMIN=envConfig.permissionLevel.Admin
const PAID=envConfig.permissionLevel.PaidUser
const FREE=envConfig.permissionLevel.SimpleUser

exports.routConfig=function(app){
    app.post('/api/todo',[
        validationMiddleware.validJWTNeeded,
        permissionMiddleware.minPermissionLevelRequired(FREE),
        userIdMiddleware.checkUserId,todoController.insert])
    app.get('/api/todo/:id',[
        validationMiddleware.validJWTNeeded,
        permissionMiddleware.minPermissionLevelRequired(FREE),
        todoController.getTodoById])
    app.patch('/api/todo/:id',[
        validationMiddleware.validJWTNeeded,
        permissionMiddleware.minPermissionLevelRequired(FREE),
        todoController.UpdateTodo])
    app.delete('/api/todo/:id',[
        validationMiddleware.validJWTNeeded,
        permissionMiddleware.minPermissionLevelRequired(FREE),
        todoController.DeleteTodo])
    app.get('/api/todo',[
        validationMiddleware.validJWTNeeded,
        permissionMiddleware.minPermissionLevelRequired(ADMIN),
        todoController.getAllTodos])
}