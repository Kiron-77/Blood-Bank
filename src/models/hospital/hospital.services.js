
const HospitalModel = require("./hospital.model");

class HospitalService {
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
    createHospital = async (data) => {
        try {
            const hospital = new HospitalModel(data)
            return await hospital.save()
        } catch (exception) {
            throw exception
        }
    }
    getByFilter = async (filter) => {
        try {
            const data = await HospitalModel.find(filter)
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
    updateHospital = async (id,data) => {
        try {
            let status = await HospitalModel.findByIdAndUpdate(id, {
                $set:data
            })
            return status;
        } catch (exception) {
            throw exception
        }
    }
    deleteById = async (id) => {
        try {
            let response = await HospitalModel.findByIdAndDelete(id)
            if (!response) {
                throw { code: 404, message: "hospital doesnot exist" }
            } else {
                return response
            }
        } catch (exception) {
            throw exception
        }
    }
}
const hospitalSvc = new HospitalService()
module.exports = hospitalSvc;