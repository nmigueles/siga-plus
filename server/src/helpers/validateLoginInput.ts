import Joi from 'joi';

interface ExpectedLogin {
  username?: string;
  password?: string;
}

export function validateLoginInput(loginBody: ExpectedLogin) {
  const { error, value } = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(4).max(50).required(),
  })
    .options({ abortEarly: false })
    .validate(loginBody);
  return { error, value };
}
