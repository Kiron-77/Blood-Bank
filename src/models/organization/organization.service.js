
const OrganizationModel = require("./organization.model");

class OrganizationService {
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
    createOrganization = async (data) => {
        try {
            const organization = new OrganizationModel(data)
            return await organization.save()
        } catch (exception) {
            throw exception
        }
    }
    getByFilter = async (filter) => {
        try {
            const data = await OrganizationModel.find(filter)
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
    updateOrganization = async (id,data) => {
        try {
            let status = await OrganizationModel.findByIdAndUpdate(id, {
                $set:data
            })
            return status;
        } catch (exception) {
            throw exception
        }
    }
    deleteById = async (id) => {
        try {
            let response = await OrganizationModel.findByIdAndDelete(id)
            if (!response) {
                throw { code: 404, message: "organization doesnot exist" }
            } else {
                return response
            }
        } catch (exception) {
            throw exception
        }
    }
}
const organizationSvc = new OrganizationService()
module.exports = organizationSvc;