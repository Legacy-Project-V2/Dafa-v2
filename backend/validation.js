//validation
const Joi = require('@hapi/joi')

//registe validation 
const SignUpValidation = (data) =>{
    const schema ={
        username: Joi.string()
    .min(6)
    .required(),
    password: Joi.string()
    .min(6)
    .required(),
    phone:  Joi.string()
    .min(6)
    .required(),
    address: Joi.string()
    .min(1)
    .required()
    
};
return Joi.validate(data, schema);
}



//login validation 
const loginValidation = (data) =>{
    const schema ={
  username:   Joi.string()
  .min(6)
  .required(),
    password: Joi.string()
    .min(6)
    .required()
};
return Joi.validate(data, schema);
};

module.exports.SignUpValidation = SignUpValidation;
module.exports.loginValidation = loginValidation;