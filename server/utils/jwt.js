const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const signAccessToken = (user_id, role) =>
  jwt.sign({ _id: user_id, role }, process.env.JWT_SECRETKEY, {
    expiresIn: "7d",
  });

const signRefreshToken = (user_id) =>
  jwt.sign({ _id: user_id }, process.env.JWT_SECRETKEY, {
    expiresIn: "7d",
  });

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (!req?.headers?.authorization?.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Không tìm thấy access token",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRETKEY, (err, decode) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Xác thực access token không thành công",
      });
    }
    req.user = decode;
    next();
  });
});

const verifyIsAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (+role !== 2000) {
    return res.status(401).json({
      success: false,
      message: "Quyền truy cập là admin ",
    });
  }
  next();
});

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyIsAdmin,
};
