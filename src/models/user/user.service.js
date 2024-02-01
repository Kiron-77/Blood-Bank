const UserModel = require("./user.model");

class userService {
    transformRequest = (req, isEdit = false) => {
        const data = {
            ...req.body
        }
        if (!isEdit) {
            data.createdBy = req.authUser._id
        } else {
            data.updatedBy = req.authUser._id
        }
        return data;
    }
    getOneByFilter = async (filter) => {
        try {
            const data = await UserModel.find(filter)
                .populate('user'['_id', 'name'])
                .populate('createdBy'['_id', 'name', 'role'])
                .populate('updatedBy'['_id', 'name', 'role'])
                .sort({ '_id': 'desc' })
            return data;
        } catch (exception) {
            throw exception
        }
    }
    updateUser = async (id,data) => {
        try {
            let status = await UserModel.findByIdAndUpdate(id, {
                $set:data
            })
            return status;
        } catch (exception) {
            throw exception
        }
    }
    deleteById = async (id) => {
        try {
            let response = await UserModel.findByIdAndDelete(id)
            if (!response) {
                throw{code:404,message:"User not found"}
            } else {
                return response
            }
        } catch (exception) {
            throw exception
        }
    }
}
const userSvc = new userService()
module.exports = userSvc