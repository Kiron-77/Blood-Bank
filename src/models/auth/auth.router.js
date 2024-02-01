const router = require('express').Router()
const authCtrl = require('./auth.controller')
const { validator, paramValidator } = require('../../middlewares/validator.middliware')
const { registerSchema, activationToken, passwordSchema, loginSchema } = require('./auth.request')
const uploader = require('../../middlewares/uploader.middleware')
const authCheck = require('../../middlewares/auth.middleware')


router.post("/register", uploader.single('image'), validator(registerSchema), authCtrl.register)
router.get("/verify/:token", paramValidator(activationToken), authCtrl.verifyActivationToken)
router.post("/activation/:token", paramValidator(activationToken), validator(passwordSchema), authCtrl.activateUser)

router.post("/login", validator(loginSchema), authCtrl.loginUser)
router.get("/me",authCheck, authCtrl.getLoggedInUser)
router.get("/logout",authCheck, authCtrl.logoutUser)

router.post("/forget-password", authCtrl.sendEmailForForgetPassword)
router.get("/verify-password-token/:token", paramValidator(activationToken), authCtrl.verifyForgetPasswordToken)
router.post("/set-password/:token", paramValidator(activationToken), validator(passwordSchema), authCtrl.updatePassword)

module.exports = router;