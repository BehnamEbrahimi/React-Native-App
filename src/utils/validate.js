import Joi from 'joi-browser';

export default function(formData, schema) {
  const { error } = Joi.validate(formData, schema, { abortEarly: false });
  if (!error) return null;
  const errors = {};
  for (let item of error.details) {
    if (errors[item.path[0]]) {
      errors[item.path[0]].push(item.message);
    } else {
      errors[item.path[0]] = [item.message];
    }
  }
  return errors;
}
