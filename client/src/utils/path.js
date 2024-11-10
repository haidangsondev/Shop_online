const path = {
  // Public
  ALL: "*",
  PUBLIC: "/",
  HOME: "",
  LOGIN: "login",
  PRODUCTS__CATEGORY: ":category",
  BLOGS: "blogs",
  OUR_SERVICES: "services",
  FAQS: "faqs",
  DETAIL_PRODUCT: ":category/:product_id/:title",
  FINAL_REGISTER: "final-register/:status",
  RESET_PASSWORD: "reset-password/:passwordResetToken",
  DETAIL_CART: "detail-cart",
  CHECKOUT: "checkout",
  PRODUCTS: "products",
  // Admin
  ADMIN: "admin",
  MANEGE_USER: "manege-user",
  MANEGE_PRODUCT: "manege-product",
  MANEGE_ORDER: "manege-order",
  CREATE_PRODUCT: "create-product",
  DASBOARD: "dasboard",

  // User
  USER: "user",
  PROFILE: "profile",
  HISTORY: "buy-history",
  CART: "cart",
  WISHLIST: "wishlist",
};

export default path;
