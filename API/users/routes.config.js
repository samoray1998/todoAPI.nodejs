const userController=require('./controllers/users.controller')

exports.routeConfig=function(app){
    app.post('/api/user',[userController.insert])
}
