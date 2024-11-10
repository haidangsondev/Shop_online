import path from "./path";
import icons from "utils/icons";

const {
  FaShieldAlt,
  FaTruckFront,
  FaGift,
  MdOutlineKeyboardReturn,
  FaPhoneAlt,
} = icons;
export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "BLOGS",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "OUR SERVICES",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 5,
    value: "FAQS",
    path: `/${path.FAQS}`,
  },
];

export const productExtra = [
  {
    id: "1",
    title: "Guarantee",
    sub: "Quantity Checked",
    icon: <FaShieldAlt />,
  },
  {
    id: "2",
    title: "Free Shipping",
    sub: "Free On All Products",
    icon: <FaTruckFront />,
  },
  {
    id: "3",
    title: "Special Gift Cards",
    sub: "Special Gift Cards",
    icon: <FaGift />,
  },
  {
    id: "4",
    title: "Free Return",
    sub: "Within 7 Days",
    icon: <MdOutlineKeyboardReturn />,
  },
  {
    id: "5",
    title: "Consultancy",
    sub: "Lifetime 24/7/356",
    icon: <FaPhoneAlt />,
  },
];

export const productInfo = [
  {
    id: "1",
    name: "DESCRIPTION",
    content:
      "Technology: GSM / CDMA / HSPA / EVDO / LTEDimensions: 142.4 x 69.6 x 7.9 mmWeight: 152 gDisplay: Resolution: 1440 x 2560OS: Android 6.0 (Marshmallow)Chipset: Exynos 8890CPU: Quad-coreInternal: 32 GB, 4 Camera: 112 MP - 5 MP",
  },
  {
    id: "2",
    name: "WANRANTY",
    content:
      "LIMITED WARRANTIESLimited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:\nFrames Used In Upholstered and Leather ProductsLimited Lifetime WarrantyA Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairsottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.",
  },
  {
    id: "3",
    name: "DELIVERY",
    content:
      "Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.Picking up at the store Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.Delivery Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above",
  },
  {
    id: "4",
    name: "PAYMENT",
    content:
      "You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.Picking up at the store Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.Delivery Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above",
  },
];

export const colorProduct = [
  "white",
  "black",
  "yellow",
  "red",
  "gray",
  "blue",
  "green",
];
export const optionsSelect = [
  {
    id: "1",
    value: "-sold",
    text: "Bán chạy nhất",
  },
  {
    id: "2",
    value: "-title",
    text: "Chữ cái từ A -> Z",
  },
  {
    id: "3",
    value: "title",
    text: "Chữ cái từ Z -> A",
  },
  {
    id: "4",
    value: "-price",
    text: "Giá từ cao đến thấp",
  },
  {
    id: "5",
    value: "price",
    text: "Giá từ thấp đến cao",
  },
  {
    id: "6",
    value: "-createAt",
    text: "Mới nhất",
  },
  {
    id: "7",
    value: "createAt",
    text: "Cũ nhất",
  },
];

export const voteState = [
  {
    id: "1",
    text: "Rất tệ",
  },
  {
    id: "2",
    text: "Tệ",
  },
  {
    id: "3",
    text: "Bình thường",
  },
  {
    id: "4",
    text: "Tốt",
  },
  {
    id: "5",
    text: "Rất tốt",
  },
];

const {
  MdDashboard,
  FaUserEdit,
  FaLuggageCart,
  RiCake3Line,
  FaShoppingCart,
  FaHeart,
  MdWorkHistory,
} = icons;
export const sliderDasboard = [
  {
    id: 1,
    type: "SINGLE",
    text: "Trang chủ",
    path: `/${path.ADMIN}/${path.DASBOARD}`,
    icon: <MdDashboard />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Quản lí người dùng",
    path: `/${path.ADMIN}/${path.MANEGE_USER}`,
    icon: <FaUserEdit />,
  },

  {
    id: 3,
    type: "PARENT",
    text: "Quản lí sản phẩm",
    icon: <RiCake3Line />,
    submenu: [
      {
        text: "Tạo sản phẩm",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
      },
      {
        text: "Quản lí sản phẩm ",
        path: `/${path.ADMIN}/${path.MANEGE_PRODUCT}`,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Quản lí đơn hàng",
    path: `/${path.ADMIN}/${path.MANEGE_ORDER}`,
    icon: <FaLuggageCart />,
  },
];

export const sliderDasboardUser = [
  {
    id: 1,
    type: "SINGLE",
    text: "Cá nhân",
    path: `/${path.USER}/${path.PROFILE}`,
    icon: <MdDashboard />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Giỏ hàng",
    path: `/${path.USER}/${path.CART}`,
    icon: <FaShoppingCart />,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "Yêu thích",
    path: `/${path.USER}/${path.WISHLIST}`,
    icon: <FaHeart />,
  },

  {
    id: 4,
    type: "SINGLE",
    text: "Lịch sử",
    path: `/${path.USER}/${path.HISTORY}`,
    icon: <MdWorkHistory />,
  },
];

export const roles = [
  {
    code: 2000,
    value: "Admin",
  },
  {
    code: 2001,
    value: "User",
  },
];

export const isBlocked = [
  {
    code: true,
    value: "Khóa",
  },
  {
    code: false,
    value: "Hoạt động",
  },
];

export const statusOrder = [
  { label: "Hủy", value: "Hủy" },
  { label: "Đang xử lí", value: "Đang xử lí" },
  { label: "Đã giao", value: "Đã giao" },
];
