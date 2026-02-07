import express from "express";
import authentication from "../middlewares/authentication.js";
import {
  createUser,
  loginUser,
  requestOTP,
  validateOTP,
  whoAmI,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/signUp", createUser);
router.post("/login", loginUser);
router.post("/generateOTP", requestOTP);
router.post("/validateOTP", validateOTP);
router.get("/whoAmI", authentication, whoAmI);

export default router;
