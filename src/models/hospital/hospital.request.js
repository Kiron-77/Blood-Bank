const Joi = require("joi")

const hospitalSchema = Joi.object({
    hospitalName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    inventoryType: Joi.string().pattern(/^(in|out)$/),
    quantity: Joi.string().min(1).required(),
    phone: Joi.string().pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/),
    role: Joi.string().pattern(/^(hospital)$/)
    

    
})
module.exports = {hospitalSchema}