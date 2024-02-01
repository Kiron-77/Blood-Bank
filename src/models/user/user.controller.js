
const userSvc = require("./user.service");

class UserController{
    getAlluser = async (req, res, next) => {
        try {
            const query = req.query;
            let filter = {};
            if (query.search) {
                filter = {
                    title:new RegExp(query.search,'i')
                }
            }
            const user = await userSvc.getOneByFilter(filter)
            if (!user) {
                throw{code:404,message:"User not found"}
            }
            user.password = undefined
            res.json({
                result: user,
                message: "User get successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
    getUserDetail = async (req, res, next) => {
        try {
            const data = await userSvc.getOneByFilter({_id: req.params.id})
            if (!data) {
                throw{code:404,message:"User doesnot exist"}
            } else {
                res.json({
                    result: data,
                    message: "User fetched",
                    meta:null
                })
            }
        } catch (exception) {
            next(exception)
        }
    }
    updateUserById = async(req, res, next) => {
        try {
            const userDetail = await userSvc.getOneByFilter({ _id: req.params.id })
            if (!userDetail) {
                throw{code:404,message:"User not found"}
            }
            const data = userSvc.transformRequest(req, true)
            const success = await userSvc.updateUser(req.params.id,data)
            if (!success) {
                throw{code:400,message:"Problem while Updating"}
            }
            res.json({
                result: success,
                message: "User Updated Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
    deleteById = async (req, res, next) => {
        try {
            let response = await userSvc.deleteById(req.params.id)
            res.json({
                result: response,
                message: "User deleted Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
}
const userCtrl = new UserController()
module.exports = userCtrl;