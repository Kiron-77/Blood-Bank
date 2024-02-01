const Joi = require("joi")

const inventorySchema = Joi.object({
    quantity: Joi.string().min(1).required(),
    inventoryType: Joi.string().pattern(/^(in|out)$/),
    bloodGroup: Joi.string().regex(/^(O|A||B|AB+|)[+-]$/),
    role: Joi.string().pattern(/^(admin|doner|user|organization|hospital)$/),
    hospital: Joi.string().empty(),
    doner: Joi.string().empty(),
    user: Joi.string().empty(),
    organization:Joi.string().empty()
    
})
module.exports = {inventorySchema}