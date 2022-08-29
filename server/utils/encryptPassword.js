import bcrypt from "bcrypt";
const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  } catch (error) {
    console.log("error hashing password", error);
  }
};

const verifyPassword = async (pasword, hashedPassword) => {
  const verified = await bcrypt.compare(pasword, hashedPassword);
  console.log("verified", verified);
  return verified;
};
export { encryptPassword, verifyPassword };
