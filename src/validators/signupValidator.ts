import joi from "joi";
import validator from "./validator.js";

const signInSchema = joi.object({
  username: joi.string().min(3).max(16).required(),
  email: joi.string().email().required(),
  mobile: joi.string().min(10).max(13).required(),
  role: joi.string().required(),
  password: joi.string().min(6).max(12).required(),
});

export default validator(signInSchema);
