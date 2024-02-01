const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: function () {
            if (this.role === "user" || this.role === "admin" || this.role === 'doner') {
                return true
            }
            return false
        }
    },

    organizationName: {
        type: String,
        required: function () {
            if (this.role === "organization") {
                return true
            }
            return false
        }  
    },
    hospitalName: {
        type: String,
        required: function () {
            if (this.role === 'hospital') {
                return true
            }
            return false
        }
    },
    role: {
        type: String,
        required: true,
        enum:['admin','organization','doner','user','hospital']
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
    },
   
    address: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
   
    activationToken: String,
    forgetPasswordToken:String,
    status:{
        type:String,
        enum:["activated","notactivated","suspended","deleted"],
        default:"notactivated"
    },
    dateOfBirth:Date,
    website: {
        type:String
    },

    image: {
        type: String
    },

    
}, {
    timestamps : true,
    autoCreate:true,
    autoIndex:true
})
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel;