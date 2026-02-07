import bcrypt from "bcryptjs";

const decryptData = async (
  data: string,
  storedData: string,
): Promise<boolean> => {
  const match = await bcrypt.compare(data, storedData);
  return match;
};

export default decryptData;
