const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error("Lỗi hasspassword");
  }
}
async function comparePassword(password, passwordHash) {
  try {
    const isMatch = await bcrypt.compare(password, passwordHash);
    return isMatch;
  } catch (err) {
    throw new Error("Lỗi compare password");
  }
}
module.exports = { hashPassword, comparePassword };
