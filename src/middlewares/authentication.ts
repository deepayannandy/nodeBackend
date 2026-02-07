import { Request, Response } from "express";
import verifyTokenCookie from "./cookieValidator.js";
import verifyToken from "./verifyToken.js";

const authentication = async (req: Request, res: Response, next: any) => {
  const deviceType: string | undefined = req.headers["x-device-type"] as
    | string
    | undefined;

  if (!deviceType || !["web", "mobile"].includes(deviceType)) {
    return res
      .status(400)
      .json({ success: false, message: "Missing or invalid device type" });
  }
  if (deviceType === "web") {
    verifyTokenCookie(req, res, next);
  } else {
    verifyToken(req, res, next);
  }
};

export default authentication;
