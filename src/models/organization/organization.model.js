
const mongoose = require("mongoose")

const OrganizationSchema = new mongoose.Schema({
    organizationName: {
        type: String,
        min: 3,
        max: 30,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    email: {
       type: String,
        unique:true,
        required:true
    },
 
    role: {
        type: String,
        required:true,
        default: "organization"
    },
    inventoryType: {
        type: String,
        required: true,
        enum: ['out']
    },
    quantity: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const OrganizationModel = mongoose.model("Organization", OrganizationSchema)
module.exports = OrganizationModel;