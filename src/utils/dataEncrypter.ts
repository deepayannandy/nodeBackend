import bcrypt from "bcryptjs";

const encryptData = async (data: string): Promise<string> => {
  const hashedData = await bcrypt.hash(data, process.env.ENCRYPT_SALT!);
  return hashedData;
};

export default encryptData;
