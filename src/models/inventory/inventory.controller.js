
const inventorySvc = require("./inventory.service")
class InventoryController {
     createInventory = async (req, res, next) => {
        try {
            const data = inventorySvc.transformRequest(req)
            const success = await inventorySvc.createInventory(data)
            res.json({
                result: success,
                message: "Inventory successfully stored ",
                meta: null
            })
        } catch (exception) {
            console.log("create inventory", exception)
            next(exception)
        }
    }
    updateInventory = async(id,data) => {
        try {
            let status = await ProductModel.findByIdAndUpdate(id, {
               $set:data
            }) 
            return status;
        } catch (exception) {
            throw exception
        }
    }
    listAllInventory = async(req, res, next) => {
        try {
            const inventorylist = await inventorySvc.getByFilter(req.body.userId)
            res.json({
                result: inventorylist,
                message: " All the Inventory list ",
                meta: null
            })
        } catch (exception) {
          next(exception)  
        }
    }
    getInventoryDetail = async (req, res, next) => {
        try {
            const data = await inventorySvc.getByFilter({ _id: req.params.id })
            if (!data) {
                throw{code:404,message:"Inventory doesnot exist"}
            } else {
                res.json({
                    result: data,
                    message: "Inventory Fetched",
                    meta:null
                })
            }
        } catch (exception) {
            next(exception)
        }
    }
    updateById = async(req, res, next) => {
        try {
            const inventoryDetail = await inventorySvc.getByFilter({ _id: req.params.id })
            if (!inventoryDetail) {
                throw{code:404,message:"Inventory not found"}
            }
            const data = inventorySvc.transformRequest(req, true)
            
            const success = await inventorySvc.updateInventory(req.params.id,data)
            if (!success) {
                throw{code:400,message:"Problem while Updating"}
            }
            res.json({
                result: success,
                message: "Inventory Updated Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
    deleteById = async(req,res,next) => {
        try {
            let response = await inventorySvc.deleteById(req.params.id)
            res.json({
                result: response,
                message: "inventory deleted successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
}
const inventoryCtrl = new InventoryController()
module.exports =inventoryCtrl