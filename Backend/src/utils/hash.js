import bcrypt from "bcrypt";
export const hashPassword = (pwd) => bcrypt.hash(pwd, 10);
