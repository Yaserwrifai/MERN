import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const issueToken = (userId) => {
  const signOptions = {
    expiresIn: "5 d",
  };

  const payload = {
    sub: userId,
  };
  const jwt = jsonwebtoken.sign(
    payload,
    process.env.SECRET_OR_KEY,
    signOptions
  );
  return jwt;
};
export { issueToken };