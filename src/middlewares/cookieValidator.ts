import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
const verifyToken = (req: Request, res: Response, next: any) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Authentication required. No token provided.",
    });
  }
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decodedData;
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      error: "'Invalid or expired token",
    });
  }
};

export default verifyToken;
