
const organizationSvc = require("./organization.service")
class OrganizationController {
     createOrganization = async (req, res, next) => {
        try {
            const data = organizationSvc.transformRequest(req)
            const success = await organizationSvc.createOrganization(data)
            res.json({
                result: success,
                message: "Organization created successfully ",
                meta: null
            })
        } catch (exception) {
            console.log("create organization", exception)
            next(exception)
        }
    }
 
    listAllOrganization = async(req, res, next) => {
        try {
            const organizationlist = await organizationSvc.getByFilter(req.body.userId)
            res.json({
                result: organizationlist,
                message: " All the Organization list ",
                meta: null
            })
        } catch (exception) {
          next(exception)  
        }
    }
    getOrganizationDetail = async (req, res, next) => {
        try {
            const data = await organizationSvc.getByFilter({ _id: req.params.id })
            if (!data) {
                throw{code:404,message:"Organization doesnot exist"}
            } else {
                res.json({
                    result: data,
                    message: "Organization Fetched",
                    meta:null
                })
            }
        } catch (exception) {
            next(exception)
        }
    }
    updateById = async(req, res, next) => {
        try {
            const organizationDetail = await organizationSvc.getByFilter({ _id: req.params.id })
            if (!organizationDetail) {
                throw{code:404,message:"Organization not found"}
            }
            const data = organizationSvc.transformRequest(req, true)
            
            const success = await organizationSvc.updateOrganization(req.params.id,data)
            if (!success) {
                throw{code:400,message:"Problem while Updating"}
            }
            res.json({
                result: success,
                message: "Organization Updated Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
    deleteById = async(req,res,next) => {
        try {
            let response = await organizationSvc.deleteById(req.params.id)
            res.json({
                result: response,
                message: "organization deleted successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
}
const organizationCtrl = new OrganizationController()
module.exports =organizationCtrl