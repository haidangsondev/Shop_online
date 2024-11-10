const productModel = require("../models/product.model");
const productCategoryModel = require("../models/productCategory.model");
const asyncHandler = require("express-async-handler");
const data = require("../data/ecommerce.json");
const dataProductCategory = require("../data/category_brand");
const slugify = require("slugify");

const initialProduct = async (product) => {
  await productModel.create({
    title: product?.name,
    slug: slugify(product?.name) + "",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((item) => item.label === "Color")
      ?.variants[0],
    thumb: product?.thumb,
    totalRatings: 0,
  });
};
const initialProductCategory = async (productCategory) => {
  await productCategoryModel.create({
    title: productCategory?.cate,
    brand: productCategory?.brand,
    image: productCategory?.image,
  });
};
const insertProduct = asyncHandler(async (req, res) => {
  let productAll = [];
  for (let product of data) {
    productAll.push(initialProduct(product));
  }
  await Promise.all(productAll);
  return res.json("Done");
});
const insertProductCategory = asyncHandler(async (req, res) => {
  let productCategoryAll = [];
  for (let productCategory of dataProductCategory) {
    productCategoryAll.push(initialProductCategory(productCategory));
  }
  await Promise.all(productCategoryAll);
  return res.json("Done");
});

module.exports = {
  insertProduct,
  insertProductCategory,
};
