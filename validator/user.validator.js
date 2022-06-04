const Joi = require('joi')

const userValidatorSchema = (fields)=>{
    const validatorSchema = Joi.object({
        email:Joi.string().min(8).max(32).required(),
        password:Joi.string().min(8).max(32).required()
    })
    const {error,value} = validatorSchema.validate(fields)
    return {error,value}
}

module.exports = {userValidatorSchema}