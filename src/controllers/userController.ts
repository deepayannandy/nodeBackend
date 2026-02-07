import { Request, Response } from "express";
import signupValidator from "../validators/signupValidator.js";
import loginValidator from "../validators/loginValidator.js";
import userModel from "../models/userModels.js";
import encryptData from "../utils/dataEncrypter.js";
import decryptData from "../utils/dataDecryptor.js";
import generateToken from "../utils/tokenGenerator.js";

//this function will create user during signup
const createUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = signupValidator(req.body);
    if (error)
      return res.status(400).json({ success: false, error: error.message });
    const existingUser = await userModel.findOne({
      $or: [{ email: value.email }, { mobile: value.mobile }],
    });
    if (existingUser)
      return res.status(409).json({
        success: false,
        error: "EmailId or Mobile number already exist",
      });
    value.password = await encryptData(value.password);
    const user = new userModel(value);
    const newUser = await user.save();
    return res.status(201).json({ success: true, data: newUser._id });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

//this function will be used to do a login via password
const loginUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginValidator(req.body);
    if (error)
      return res.status(400).json({ success: false, error: error.message });
    const selectedUser = await userModel.findOne({
      $or: [{ email: value.email }, { mobile: value.mobile }],
    });
    if (!selectedUser)
      return res.status(404).json({
        success: false,
        error: "User not available",
      });
    const isPasswordMatched = await decryptData(
      value.password,
      selectedUser.password!,
    );
    if (!isPasswordMatched)
      return res.status(401).json({
        success: false,
        error: "UserId or Password is invalid",
      });
    const userToken = generateToken({
      userId: selectedUser._id.toString(),
      userRole: selectedUser.role!,
    });

    return res
      .cookie("access_token", userToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION",
      })
      .status(200)
      .json({ success: true, token: userToken });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

//this function will be used to send otp while login
const requestOTP = async (req: Request, res: Response) => {};

//this function will be used to validate otp while login
const validateOTP = async (req: Request, res: Response) => {};

//this function will be used to validate the user data
const whoAmI = async (req: Request, res: Response) => {
  try {
    const userId = req.data!.userId;
    const loginUser = await userModel.findById(userId, {
      password: 0,
      otp: 0,
      __v: 0,
    });
    if (!loginUser)
      return res.status(404).json({
        success: false,
        error: "User not available",
      });
    return res.status(200).json({ success: true, data: loginUser });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

export { createUser, loginUser, requestOTP, validateOTP, whoAmI };
