const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const { signAccessToken, signRefreshToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const uniqid = require("uniqid");

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Trường email và password là bắt buộc",
    });
  }

  const checkEmail = await userModel.findOne({ email });
  if (checkEmail) {
    throw new Error("Email đã tồn tại");
  }

  const registerToken = uniqid();
  res.cookie(
    "dataRegister",
    { ...req.body, registerToken },
    { httpOnly: true, maxAge: 15 * 60 * 1000 }
  );

  const html = `Để đăng ký, xin vui lòng nhân vào link này để xác thực email. Lưu ý hiệu lực của link chỉ có 15 phút, xin cảm ơn <a href=${process.env.URL_SERVER}/api/user/finalRegister/${registerToken}>Nhấn vào đây</a>`;
  const subject = "Đăng ký tài khoản";

  const data = {
    email,
    html,
    subject,
  };

  await sendEmail(data);
  return res.status(200).json({
    success: true,
    message: "Gửi email để xác thực email thành công",
    registerToken,
    f,
  });
});

const finalRegister = asyncHandler(async (req, res) => {
  const { register_token } = req.params;
  const cookie = req.cookies;

  if (!cookie || cookie?.dataRegister?.registerToken !== register_token) {
    res.clearCookie("dataRegister");
    return res.redirect(`${process.env.URL_CLIENT}/final-register/failed`);
  }

  const User = await userModel.create({
    email: cookie?.dataRegister?.email,
    password: cookie?.dataRegister?.password,
    registerToken: cookie?.dataRegister?.registerToken,
  });

  res.clearCookie("dataRegister", {
    httpOnly: true,
    secure: true,
  });
  if (User) {
    return res.redirect(`${process.env.URL_CLIENT}/final-register/success`);
  } else {
    return res.redirect(`${process.env.URL_CLIENT}/final-register/failed`);
  }
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Trường email và password là bắt buộc",
    });
  }

  const User = await userModel.findOne({ email });
  if (!(User && (await User.checkPassword(password)))) {
    throw new Error("Email hoặc Password không hợp lệ");
  }

  const {
    password: isPassword,
    role,
    refreshToken: refresh_token,
    passwordChangeAt,
    ...userData
  } = User.toObject();
  const accessToken = signAccessToken(User._id, role);
  const refreshToken = signRefreshToken(User._id);
  await userModel.findByIdAndUpdate(User._id, { refreshToken }, { new: true });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: true,
    message: "Đăng nhập thành công",
    accessToken,
    user: userData,
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { _id } = req.user;
  if (!cookie || !cookie.refreshToken) {
    throw new Error("Không tìm thấy refresh token ");
  }
  await userModel.findByIdAndUpdate(_id, { refreshToken: "" }, { new: true });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    success: true,
    message: "Đăng xuất thành công",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Trường email là bắt buộc",
    });
  }

  const User = await userModel.findOne({ email });
  if (!User) {
    throw new Error("không tìm thấy người dùng qua email");
  }
  const passwordResetToken = await User.createPasswordToken();
  await User.save();

  const html = `Để lấy lại mật khẩu, xin vui lòng nhân vào link này. Lưu ý hiệu lực của link chỉ có 15 phút, xin cảm ơn <a href=${process.env.URL_CLIENT}/reset-password/${passwordResetToken}>${passwordResetToken}</a>`;
  const subject = "Thay đổi mật khẩu";

  const data = {
    email,
    html,
    subject,
  };
  await sendEmail(data);
  return res.status(200).json({
    success: true,
    message: "Gửi email để xác thực mật khẩu thành công",
    passwordResetToken,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, tokenPassword } = req.body;
  if (!tokenPassword || !password) {
    return res.status(400).json({
      success: false,
      message: "Trường token password hoặc password là bắt buộc",
    });
  }
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(tokenPassword)
    .digest("hex");

  const User = await userModel.findOne({
    passwordResetToken,
  });

  if (!User) {
    throw new Error("Không tìm thấy user qua token resetPassword");
  }

  User.password = password;
  User.passwordResetToken = undefined;
  User.passwordResetExpires = undefined;
  User.passwordChangeAt = Date.now();
  await User.save();

  return res.status(200).json({
    success: true,
    message: "Đổi mật khẩu thành công",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken) {
    throw new Error("Không tìm thấy refresh token ");
  }

  jwt.verify(
    cookie.refreshToken,
    process.env.JWT_SECRETKEY,
    async (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Xác thực refersh token không thành công",
        });
      }
      const User = await userModel.findOne({
        _id: decode._id,
        refreshToken: cookie.refreshToken,
      });
      return res.status(200).json({
        success: User ? true : false,
        accessToken: User ? signAccessToken(User._id, User.role) : "",
        message: User
          ? "Lấy accessToken thành công"
          : "Xác thực người dùng không thành công ",
      });
    }
  );
});
const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const User = await userModel
    .findById(_id)
    .select("-refreshToken -password")
    .populate({
      path: "cart",
      populate: {
        path: "product",
        select: "title thumb images price category brand",
      },
    })
    .populate("wishlist", "title thumb price color category");
  return res.status(200).json({
    success: User ? true : false,
    User: User ? User : "Không tìm thấy người dùng",
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((item) => delete queries[item]);
  //   format filter
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatQueries = JSON.parse(queryString);

  //   filtering
  if (queries?.username) {
    formatQueries.username = { $regex: queries.username, $options: "i" };
  }
  if (queries?.q) {
    delete formatQueries.q;
    formatQueries["$or"] = [
      { username: { $regex: queries.q, $options: "i" } },
      { email: { $regex: queries.q, $options: "i" } },
    ];
  }

  let Users = userModel.find(formatQueries);

  //   sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    Users = Users.sort(sortBy);
  }

  //   fields
  if (req.query.fields) {
    const fieldsBy = req.query.fields.split(",").join(" ");
    Users = Users.select(fieldsBy);
  }

  //   pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  Users.skip(skip).limit(limit);

  const isUsers = await Users.exec();
  const counts = await userModel.find(formatQueries).countDocuments();

  return res.status(200).json({
    success: isUsers ? true : false,
    message: isUsers ? "Lấy người dùng thành công " : "Lấy người dùng thất bại",
    counts,
    page,
    Users: isUsers,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    throw new Error("Trường query user_id là bắt buộc");
  }
  const User = await userModel.findOneAndDelete({ _id: user_id });
  return res.status(200).json({
    success: User ? true : false,
    message: User
      ? `Xóa người dùng thành công`
      : "Xóa người dùng không thành công, do người dùng không tồn tại hoặc chưa đăng ký tài khoản",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { username, email, phone, address } = req.body;
  const data = { username, email, phone, address };
  if (req.file) data.avatar = req.file.path;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Thông tin cập nhật là bắt buộc",
    });
  }
  const User = await userModel
    .findByIdAndUpdate(_id, data, { new: true })
    .select("-password  -refreshToken");
  return res.status(200).json({
    success: User ? true : false,
    message: User
      ? `Cập nhật thông tin người dùng thành công`
      : "Cập nhật thông tin người dùng thất bại",
    User,
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  if (!user_id || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Trường user_id từ params và thông tin cập nhật là bắt buộc",
    });
  }
  const User = await userModel
    .findByIdAndUpdate({ _id: user_id }, req.body, { new: true })
    .select("-password -refreshToken");
  return res.status(200).json({
    success: User ? true : false,
    message: User
      ? `Cập nhật thông tin người dùng thành công`
      : "Cập nhật thông tin người dùng thất bại",
    User,
  });
});

const addAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) {
    return res.status(400).json({
      success: false,
      message: "Thông tin địa chỉ là bắt buộc",
    });
  }

  const User = await userModel.findByIdAndUpdate(
    _id,
    {
      $push: { address: req.body.address },
    },
    { new: true }
  );

  return res.status(200).json({
    success: User ? true : false,
    message: User
      ? "Cập nhật địa chỉ thành công"
      : "Cập nhật địa chỉ không thành công",
    User,
  });
});

const addCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const {
    product_id,
    color = "BLACK",
    quantity = 1,
    price,
    thumb,
    title,
  } = req.body;
  if (!product_id) {
    return res.status(400).json({
      success: false,
      message: "Các trường product_id, color là bắt buộc",
    });
  }
  const User = await userModel.findById(_id);
  if (!User) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy người dùng",
    });
  }
  const productCart = User.cart.find(
    (item) => item.product.toString() === product_id
  );
  if (productCart) {
    const result = await userModel.updateOne(
      { cart: { $elemMatch: productCart } },
      {
        $set: {
          "cart.$.quantity": quantity,
          "cart.$.color": color,
          "cart.$.price": price,
          "cart.$.thumb": thumb,
          "cart.$.title": title,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: result ? true : false,
      message: result
        ? "Thêm sản phẩm thành công"
        : "Thêm sản phẩm không thành công",
    });
  } else {
    const result = await userModel.findByIdAndUpdate(
      _id,
      {
        $push: {
          cart: { product: product_id, color, quantity, price, thumb, title },
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: result ? true : false,
      message: result
        ? "Thêm sản phẩm thành công"
        : "Thêm sản phẩm không thành công",
      result,
    });
  }
});

const deleteCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { product_id } = req.params;
  if (!product_id) {
    return res.status(400).json({
      success: false,
      message: "Trường product_id là bắt buộc",
    });
  }
  const User = await userModel.findById(_id);
  if (!User) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy người dùng",
    });
  }

  const productCart = User.cart.find(
    (item) => item.product.toString() === product_id
  );

  if (!productCart) {
    return res.status(200).json({
      success: true,
      message: "không tìm thấy sản phẩm để xóa",
    });
  }
  const result = await userModel.findByIdAndUpdate(
    _id,
    { $pull: { cart: { product: product_id } } },
    { new: true }
  );
  return res.status(200).json({
    success: result ? true : false,
    message: result
      ? "Xóa sản phẩm thành công"
      : "Xóa sản phẩm không thành công",
    result,
  });
});

const updateWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { product_id } = req.params;
  if (!product_id) {
    return res.status(400).json({
      success: false,
      message: "Trường product_id là bắt buộc",
    });
  }

  const User = await userModel.findById(_id);
  if (!User) {
    throw new Error("Không tìm người dùng");
  }
  const alreadyWishlist = User?.wishlist?.find(
    (item) => item.toString() === product_id
  );

  if (alreadyWishlist) {
    const response = await userModel.findByIdAndUpdate(
      _id,
      { $pull: { wishlist: product_id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      message: response
        ? "Xóa sản phẩm yêu thích thành công"
        : "Xóa sản phẩm yêu thích thất bại",
    });
  } else {
    const response = await userModel.findByIdAndUpdate(
      _id,
      { $push: { wishlist: product_id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      message: response
        ? "Thêm sản phẩm yêu thích thành công"
        : "Thêm sản phẩm yêu thích thất bại",
    });
  }
});
module.exports = {
  // User
  register,
  finalRegister,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  getUser,
  updateUser,
  addAddress,
  addCart,
  deleteCart,
  updateWishlist,
  // Admin
  getAllUser,
  deleteUser,
  updateUserByAdmin,
};
