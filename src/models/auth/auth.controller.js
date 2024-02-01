require('dotenv').config()
const { randomString } = require("../../config/helper.config");
const authSvc = require("./auth.services");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class authControler {
    register = async (req, res, next) => {
        try {
            const payload = req.body;
            if (req.file) {
                payload.image = req.file.files
            }
            if (req.files) {
                const images = req.files.map((img) => img.filename)
                payload.image = images
            }
            payload.activationToken = randomString(100)
            payload.status = 'notactivated';
            const dbStatus = await authSvc.registerUser(payload)
            res.json({
                result: dbStatus,
                message: "registered data",
                meta: null
            })
        } catch (exception) {
            console.log(exception)
            next({
                code: 422,
                message: exception.message,
                meta: null
            })
        }
    }
    verifyActivationToken = async (req, res, next) => {
        try {
            let data = await authSvc.getUserByActivationToken(req.params.token)
            res.json({
                result: data,
                message: "User verified",
                meta: null
            })
        } catch (exception) {
            next(exception)
        }
    }
    activateUser = async (req, res, next) => {
        try {
            const userDetail = await authSvc.getUserByActivationToken(req.params.token)
            const data = {
                password: bcrypt.hashSync(req.body.password, 10),
                activationToken: null,
                status: "activated"
            }
            const response = await authSvc.updateUserbyId(userDetail._id, data)
            res.json({
                result: response,
                message: "Your Account has been updated successfully",
                meta: null
            })
        } catch (exception) {
            next(exception)
        }
    }
    loginUser = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const userDetail = await authSvc.getSingleuserByFilter({ email })
            if (!userDetail) {
                throw { code: 422, message: "User does not exist", result: { email } }
            }
            if (userDetail && userDetail.status === 'activated') {
                if (bcrypt.compareSync(password, userDetail.password)) {
                    const token = jwt.sign({
                        userId: userDetail._id
                    }, process.env.JWT_SECRET, {
                        expiresIn: "1 day",
                        subject: `${userDetail._id}`
                    })
                    res.json({
                        result: {
                            token: token,
                            type: "Bearer",
                            userDetail: {
                                userId: userDetail._id,
                                name: userDetail.name,
                                email: userDetail.email,
                                role: userDetail.role
                            }
                        },
                        message: "User logged in successfully",
                        meta: null
                    })
                } else {
                    throw { code: 422, message: "Credentials does not match" }
                }
            } else {
                throw { code: 422, message: "User not activated or suspended", result: { email } }
            }

        } catch (exception) {
            next(exception)
        }
    }
    getLoggedInUser = async (req, res, next) => {
        const loggedInUser = req.authUser
        res.json({
            result: loggedInUser,
            message: "I am on me router",
            meta: null
        })
    }
    logoutUser = async (req, res, next) => {
        // Todo:logout login user
    }
    sendEmailForForgetPassword = async (req, res, next) => {
        try {
            const { email } = req.body
            const userDetail = await authSvc.getSingleuserByFilter({
                email: email
            })
            if (!userDetail) {
                throw { code: 422, message: "User does not exist", result: { email } }
            } else {
                await authSvc.sendForgetPasswordMail(userDetail)
                res.json({
                    result: null,
                    message: "An email has been sent to the registered email.Please check your email for further processing",
                    meta: null
                })
            }
        } catch (exception) {
            next(exception)
        }
    }
    verifyForgetPasswordToken = async (req, res, next) => {
        try {
            let userDetail = await authSvc.getSingleuserByFilter({ forgetPasswordToken: req.params.token })
            if (userDetail) {
                console.log(userDetail)
                res.json({
                    
                    result: userDetail,
                    message: "User does exist and verified",
                    meta: null
                })
            } else {
                throw { code: 422, message: "Token doesnot exist or expired" }
            }
        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    updatePassword = async (req, res, next) => {
        try {
            const userDetail = await authSvc.getSingleuserByFilter({ forgetPasswordToken: req.params.token })
            if (!userDetail) {
                throw { code: 422, message: "Token doesnot exist or expired " }
            } else {
                const data = {
                    password: bcrypt.hashSync(req.body.password, 10),
                    forgetPasswordToken: null,
                    status: "activated"
                }
                const response = await authSvc.updateUserbyId(userDetail._id, data)
                res.json({
                    result: response,
                    message: "Your Password has been updated successfully",
                    meta: null
                })
            }
        } catch (exception) {
            next(exception)
        }
    }

}

const authCtrl = new authControler()
module.exports = authCtrl