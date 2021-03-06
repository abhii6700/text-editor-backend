//VALIDATION
const Joi = require('@hapi/joi')

//REGSITER VALIDATION
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        role: Joi.string().empty()
    })

    return schema.validate(data)
    
}


//LOGIN VALIDATION
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
    
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;