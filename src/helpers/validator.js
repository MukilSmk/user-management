import Joi from 'joi'


const authSchema = Joi.object({
    name : Joi.string().required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
      }),
    email: Joi.string().email().lowercase().required(),
    mobile : Joi.number().required(),
    password : Joi.string().min(6).required(),

});







module.exports = {authSchema}