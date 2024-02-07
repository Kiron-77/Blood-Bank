
const mongoose = require("mongoose")

const InventrySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: true,
        enum: ['in', 'out']
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
    },
    quantity: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['organization', 'doner', 'hospital', 'user', 'admin']
    },
    organization: {
        type: mongoose.Types.ObjectId,
        ref: 'Organization',
        required: function () {
            return this.role === 'organization'
        }
    },
    hospital: {
        type: mongoose.Types.ObjectId,
        ref: 'Hospital',
        required: function () {
            return this.inventoryType === "in"
        }
    },
   
    doner: {
        type: mongoose.Types.ObjectId,
        ref: 'Doner',
        required: function () {
            return this.inventoryType === "out"
        }
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

const InventoryModel = mongoose.model("Inventory", InventrySchema)
module.exports = InventoryModel;