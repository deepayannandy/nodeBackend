import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

//token Data type
type tokenData = {
  userId: string;
  userRole: string;
};
declare global {
  namespace Express {
    interface Request {
      data?: tokenData;
    }
  }
}
const verifyTokenCookie = (req: Request, res: Response, next: any) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Authentication required. No token provided.",
    });
  }
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET!);
    req.data = decodedData as tokenData;
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      error: "'Invalid or expired token",
    });
  }
};

export default verifyTokenCookie;
