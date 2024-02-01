
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
        enum: ['organization', 'doner', 'hospital', 'user', 'admin'],
        default: "hospital"
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: function () {
            return this.role === "organization"
        },
        unique: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: function () {
            return this.inventoryType === "in"
        },
        unique: true,
    },
   
    doner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doner',
        required: function () {
            return this.inventoryType === "out"
        },
        unique: true
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