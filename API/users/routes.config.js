const userController=require('./controllers/users.controller')
const emailMiddleware=require('./middlewares/checkEmail.middleware')

exports.routeConfig=function(app){
    app.post('/api/user',[emailMiddleware.isEmailExist,userController.insert])
    app.get('/api/user/:id',[userController.getUserById])
    app.patch('/api/user/:id',[userController.UpdateUser])
    app.delete('/api/user/:id',[userController.DeleteUser])
    app.get('/api/user',[userController.getAllUsers])
}
