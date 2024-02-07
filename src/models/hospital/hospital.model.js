
const mongoose = require("mongoose")

const HospitalSchema = new mongoose.Schema({
    hospitalName: {
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
        default: "hospital"
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

const HospitalModel = mongoose.model("Hospital", HospitalSchema)
module.exports = HospitalModel;