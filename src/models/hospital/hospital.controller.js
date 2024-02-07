
const hospitalSvc = require("./hospital.services")
class HospitalController {
     createHospital = async (req, res, next) => {
        try {
            const data = hospitalSvc.transformRequest(req)
            const success = await hospitalSvc.createHospital(data)
            res.json({
                result: success,
                message: "Hospital created successfully ",
                meta: null
            })
        } catch (exception) {
            console.log("create hospital", exception)
            next(exception)
        }
    }
 
    listAllHospital = async(req, res, next) => {
        try {
            const hospitallist = await hospitalSvc.getByFilter(req.body.userId)
            res.json({
                result: hospitallist,
                message: " All the Hospital list ",
                meta: null
            })
        } catch (exception) {
          next(exception)  
        }
    }
    getHospitalDetail = async (req, res, next) => {
        try {
            const data = await hospitalSvc.getByFilter({ _id: req.params.id })
            if (!data) {
                throw{code:404,message:"Hospital doesnot exist"}
            } else {
                res.json({
                    result: data,
                    message: "Hospital Fetched",
                    meta:null
                })
            }
        } catch (exception) {
            next(exception)
        }
    }
    updateById = async(req, res, next) => {
        try {
            const hospitalDetail = await hospitalSvc.getByFilter({ _id: req.params.id })
            if (!hospitalDetail) {
                throw{code:404,message:"Hospital not found"}
            }
            const data = hospitalSvc.transformRequest(req, true)
            
            const success = await hospitalSvc.updateHospital(req.params.id,data)
            if (!success) {
                throw{code:400,message:"Problem while Updating"}
            }
            res.json({
                result: success,
                message: "Hospital Updated Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
    deleteById = async(req,res,next) => {
        try {
            let response = await hospitalSvc.deleteById(req.params.id)
            res.json({
                result: response,
                message: "hospital deleted successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
}
const hospitalCtrl = new HospitalController()
module.exports =hospitalCtrl