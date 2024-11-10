const mongoose = require("mongoose"); // Erase if already required
const brypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: [2000, 2001],
      default: 2001,
    },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        color: String,
        quantity: Number,
        price: Number,
        thumb: String,
        title: String,
      },
    ],
    address: {
      type: String,
    },
    avatar: {
      type: String,
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    registerToken: {
      type: String,
    },
    passwordChangeAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash passwrod before save in mongodb
const initialSalt = 10;
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = brypt.genSaltSync(initialSalt);
  this.password = await brypt.hash(this.password, salt);
});

// check password when user login
userSchema.methods = {
  checkPassword: async function (password) {
    return await brypt.compare(password, this.password);
  },
  createPasswordToken: async function () {
    const passwordToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(passwordToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return passwordToken;
  },
};
//Export the model
module.exports = mongoose.model("User", userSchema);
