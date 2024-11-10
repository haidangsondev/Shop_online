import { useState, useEffect, memo } from "react";
import { apiProduct } from "apis/product";

import ProductCard from "./ProductCard";
function ProductFeatur() {
  const [productCards, setProductCards] = useState(null);

  const fetchApiProductCard = async () => {
    const response = await apiProduct({ limit: 9 });
    if (response?.success) setProductCards(response.Product);
  };

  useEffect(() => {
    fetchApiProductCard();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURE PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-[15px]">
        {productCards?.map((item) => (
          <ProductCard key={item._id} data={item} />
        ))}
      </div>
      <div className="flex justify-center gap-3">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt="Product card"
          className="w-[49%] object-contain"
        />
        <div className="flex flex-col justify-between gap-4 w-[24%]">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt="Product card"
          />
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt="Product card"
          />
        </div>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt="Product card"
          className="w-[24%] object-contain"
        />
      </div>
    </div>
  );
}

export default memo(ProductFeatur);
