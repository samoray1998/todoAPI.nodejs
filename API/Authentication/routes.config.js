
const authorizationController=require('./controllers/authorization.controllers')
const verifyUserMiddleware=require('./middlewares/verifyUser.middleware')
const authValidationMiddleware=require('../../common/middleware/auth.validation.middleware')


exports.routeConfig=function(app){
    app.post('/api/auth',[
        verifyUserMiddleware.hasAuthValidFields,
        verifyUserMiddleware.isPasswordAndEmailMatch,
        authorizationController.LoginRequest
    ])
    app.post('/api/auth/refresh',[
        authValidationMiddleware.validJWTNeeded,
        authValidationMiddleware.verifyRefreshedBodyField,
        authValidationMiddleware.validRefreshNeeded,
        authorizationController.LoginRequest
    ])
    
}