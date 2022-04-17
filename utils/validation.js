import Joi from "joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });

  return schema.validate({
    name: data.name,
    email: data.email,
    password: data.password,
  });
};

export const loginValidation = (data) => {

  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  return schema.validate({
    email: data.email,
    password: data.password,
  });
};

export const ScamLinkValidation = (data) => {
  const schema = Joi.object({
    link: Joi.string().required(),
    reportedBy: Joi.string().required(),
  });

  return schema.validate({
    link: data.link,
    reportedBy: data.reportedBy,
  });
};

export const ScamEmailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    reportedBy: Joi.string().required(),
  });
};

export const QuoteValidation = (data) => {
  const schema = Joi.object({
    quote: Joi.string().required(),
  });

  return schema.validate({
    quote: data.quote,
  });
};
