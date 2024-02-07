const Joi = require('joi')

const userSchema = Joi.object({
    name: Joi.string().min(2).max(30).empty(),
    email: Joi.string().email().empty(),
    address: Joi.string().empty(),
    phone: Joi.string().pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/),
    role: Joi.string().pattern(/^(organization|hospital|user|doner|admin)$/)
})
module.exports = userSchema