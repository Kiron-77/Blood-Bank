const Joi = require("joi")

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(30).empty(),
    email: Joi.string().email().required(),
    address: Joi.string().empty(),
    phone: Joi.string().pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/),
    role: Joi.string().pattern(/^(organization|hospital|user|doner|admin)$/),
    organizationName: Joi.string().empty(),
    hospitalName:Joi.string().empty()
})
const activationToken = Joi.object({
    token:Joi.string().length(100).required()
})
const passwordSchema = Joi.object({
    password: Joi.string().min(8).max(15).required(),
    confirmPassword:Joi.ref('password')
})
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required()
})


module.exports = {registerSchema,activationToken,passwordSchema,loginSchema}