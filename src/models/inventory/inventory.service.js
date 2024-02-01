
const InventoryModel = require("./inventory.model");

class InventoryService {
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
    createInventory = async (data) => {
        try {
            const inventory = new InventoryModel(data)
            return await inventory.save()
        } catch (exception) {
            throw exception
        }
    }
    getByFilter = async (filter) => {
        try {
            const data = await InventoryModel.find(filter)
                .populate('doner' ['_id','name'])
                .populate('hospital'['_id','name'])
                .populate('createdBy'['_id','name','role'])
                .populate('updatedBy'['_id','name','role'])
                .sort({'_id':'desc'})
            return data;
        } catch (exception) {
            throw exception
        }
    }
    updateInventory = async (id,data) => {
        try {
            let status = await InventoryModel.findByIdAndUpdate(id, {
                $set:data
            })
            return status;
        } catch (exception) {
            throw exception
        }
    }
    deleteById = async (id) => {
        try {
            let response = await InventoryModel.findByIdAndDelete(id)
            if (!response) {
                throw { code: 404, message: "inventory doesnot exist" }
            } else {
                return response
            }
        } catch (exception) {
            throw exception
        }
    }
}
const inventorySvc = new InventoryService()
module.exports = inventorySvc;