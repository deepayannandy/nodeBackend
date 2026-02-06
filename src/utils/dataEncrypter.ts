import bcrypt from "bcryptjs";

const encryptData = async (data: String): Promise<string> => {
  const hashedData = await bcrypt.hash("B4c0/\/", process.env.ENCRYPT_SALT!);
  return hashedData;
};

export default encryptData;
