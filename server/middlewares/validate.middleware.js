const Joi = require("joi");

// Cấu hình Joi
const createJoiSchema = (fields) =>
  Joi.object(fields).messages({
    "string.base": "Trường này phải là chuỗi.",
    "string.min": "Trường này phải có ít nhất {#limit} ký tự.",
    "string.max": "Trường này không vượt qua {#limit} ký tự.",
    "string.email": "Email không hợp lệ.",
    "any.required": "Trường này là bắt buộc.",
    "any.only": "Giá trị không khớp với giá trị mong đợi.",
    "string.pattern.base":
      "Mật khẩu phải chứa ít nhất: một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt.",
    "number.base": "Trường này phải là một số nguyên.",
    "number.min": "Trường này không được nhỏ hơn {#limit}.",
    "number.max": "Trường này không được vượt quá {#limit}.",
  });

// Register
const registerFields = {
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,30}$/
    ),
};

// login
const loginFields = {
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
};

// forgot password
const forgotPasswordFields = {
  email: Joi.string().email().required(),
};

// reset password
const resetPasswordFields = {
  password: Joi.string().min(8).required(),
  tokenPassword: Joi.string().required(),
};

// author
const authorFields = {
  name: Joi.string().min(5).required(),
  bio: Joi.string().required(),
  nationality: Joi.string().required(),
};

// change password
const changePasswordFields = {
  currentPassword: Joi.string().min(8).required(),
  newPassword: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,30}$/
    ),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
};

// user
const userFields = {
  username: Joi.string().min(5).required(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,30}$/
    ),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
};

// address
const addressFields = {
  address: Joi.string().required(),
};

// category
const categoryFields = {
  name: Joi.string().min(5).required(),
  description: Joi.string().required(),
};

// product
const productFields = {
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  brand: Joi.string().required(),
  category: Joi.string().required(),
  color: Joi.string().required(),
};

// rating
const RatingFields = {
  star: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional(),
};

// product category
const productCategoryFields = {
  title: Joi.string().min(3).max(100).required(),
  brand: Joi.array().items(Joi.string().required()).required(),
};
// blog
const blogFields = {
  title: Joi.string().required(),
  description: Joi.string().min(3).max(100).required(),
  category: Joi.string().required(),
};
// brandFields
const brandFields = {
  title: Joi.string().required(),
};

// coupon
const couponFields = {
  name: Joi.string().required(),
  discount: Joi.number().min(0).max(100).required(),
  expire: Joi.date().required(),
};
const schemaMap = {
  register: registerFields,
  login: loginFields,
  forgotPassword: forgotPasswordFields,
  resetPassword: resetPasswordFields,
  author: authorFields,
  changePassword: changePasswordFields,
  user: userFields,
  category: categoryFields,
  address: addressFields,
  product: productFields,
  rating: RatingFields,
  productCategory: productCategoryFields,
  blog: blogFields,
  brand: brandFields,
  coupon: couponFields,
  // Admin
};

// Hàm trả về biểu mẫu xác thực
const getValidationSchema = (type) => createJoiSchema(schemaMap[type]);

// Xử lý lỗi
const validateRequest = (type) => {
  return (req, res, next) => {
    const schema = getValidationSchema(type);
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => ({
        message: err.message,
        field: err.context.key,
      }));
      return res.status(400).json({ success: false, errors });
    }

    next();
  };
};

module.exports = { validateRequest };
