import joi from "joi";
import validator from "./validator.js";

const logInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(12).required(),
});

export default validator(logInSchema);
