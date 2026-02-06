import jwt from "jsonwebtoken";
const { sign } = jwt;
//token Data type
type tokenData = {
  userId: string;
  userRole: string;
};
const generateToken = (tokenData: tokenData) => {
  const token = sign(tokenData, process.env.JWT_SECRET!, {
    expiresIn: "8h",
  });
  return token;
};

export default generateToken;
