import { useEffect, useState } from "react";
import { apiProduct } from "apis/product";
import { CustomSlider } from "components";
import { useDispatch } from "react-redux";
import { getProducts } from "redux/reduxActions/productsAction";
import { useSelector } from "react-redux";
import { memo } from "react";

const tab = [
  { id: 0, name: "best seller" },
  { id: 1, name: "new arrivals" },
];
function BestSeller() {
  const [isActiveTab, setIsAcTiveTab] = useState(0);
  const [bestSeller, setBestSeller] = useState([]);
  const [products, setProduct] = useState(null);
  const dispatch = useDispatch();

  const { newProducts } = useSelector((state) => state.products);

  const fetchApiProduct = async () => {
    const response = await apiProduct({ sort: "-sold" });
    if (response?.success) {
      setBestSeller(response.Product);
      setProduct(response.Product);
    }
  };

  useEffect(() => {
    fetchApiProduct();
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isActiveTab === 0) setProduct(bestSeller);
    if (isActiveTab === 1) setProduct(newProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveTab]);

  return (
    <div>
      <div className="flex gap-5 pb-4 border-b-2 border-main text-[20px]">
        {tab.map((item) => (
          <span
            className={`font-semibold uppercase  ${
              isActiveTab === item.id ? "text-black" : "text-gray-400"
            } `}
            key={item.id}
            onClick={() => setIsAcTiveTab(item.id)}
          >
            {item.name}
          </span>
        ))}
      </div>
      <div>
        <CustomSlider products={products} />
      </div>
      <div className="flex gap-4 mt-5 w-full">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          className="flex-1 object-contain"
          alt="product"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          className="flex-1 object-contain"
          alt="product"
        />
      </div>
    </div>
  );
}

export default memo(BestSeller);
