const userController=require('./controllers/users.controller')
const emailMiddleware=require('./middlewares/checkEmail.middleware')
const permissionMiddleware=require('../../common/middleware/auth.permission.middleware')
const validationMiddleware=require('../../common/middleware/auth.validation.middleware')
const envConfig=require('../../common/config/env.config')

const ADMIN=envConfig.permissionLevel.Admin
const PAID=envConfig.permissionLevel.PaidUser
const FREE=envConfig.permissionLevel.SimpleUser

exports.routeConfig=function(app){
    app.post('/api/user',[emailMiddleware.isEmailExist,userController.insert])
    app.get('/api/user/:userId',[
        validationMiddleware.validJWTNeeded,
        permissionMiddleware.minPermissionLevelRequired(FREE),
        userController.getUserById
    ])
    app.patch('/api/user/:userId',
    [
        validationMiddleware.validJWTNeeded,
        permissionMiddleware.minPermissionLevelRequired(PAID),
        permissionMiddleware.onlySomeUserAndAdminCanDoThisAction,
        userController.UpdateUser
    ])
    app.delete('/api/user/:userId',
    [
        validationMiddleware.validJWTNeeded,
        permissionMiddleware.minPermissionLevelRequired(ADMIN),
        userController.DeleteUser
    ])
    app.get('/api/me',[
        validationMiddleware.validJWTNeeded,
        permissionMiddleware.minPermissionLevelRequired(FREE),
        userController.currentUserInfo
    ])
    app.get('/api/user',
    [
        validationMiddleware.validJWTNeeded,
        permissionMiddleware.minPermissionLevelRequired(ADMIN),
        userController.getAllUsers
    ])
}
