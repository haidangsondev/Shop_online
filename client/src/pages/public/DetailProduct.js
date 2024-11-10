import { createSearchParams, useParams } from "react-router-dom";
import { apiAddCart, apiGetProduct, apiProduct } from "apis";
import { memo, useCallback, useEffect, useState } from "react";
import {
  Breadcrum,
  Button,
  CustomSlider,
  ProductExtra,
  ProductInfo,
  SelectQuantity,
} from "components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { createRatings, formatMoney, formatPrice } from "utils/helper";
import { productExtra } from "utils/constant";
import Dompurify from "dompurify";
import WithBase from "hoc/withBase";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "utils/path";
import { toast } from "react-toastify";
import { getUser } from "redux/reduxActions/userAction";
function DetailProduct({ isShow, navigate, dispatch, location }) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const { current } = useSelector((state) => state.user);
  const { product_id, title, category } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productOther, setProductOther] = useState(null);
  const [imageShow, setImageShow] = useState(null);
  const [updatePageVote, setUpdatePageVote] = useState(false);
  const handleInputQuantity = useCallback(
    (number) => {
      if (
        !Number(number) ||
        Number(number) < 1 ||
        Number(number) > product?.quantity
      ) {
        return;
      } else {
        setQuantity(number);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quantity]
  );
  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity <= 1) {
        return;
      }
      if (flag === "plus" && quantity >= product?.quantity) {
        return;
      }
      if (flag === "minus") setQuantity((pre) => +pre - 1);
      if (flag === "plus") setQuantity((pre) => +pre + 1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quantity]
  );
  // const handleChange
  const fetchApiGetProductByProduct_id = async () => {
    const response = await apiGetProduct(product_id);
    if (response?.success) {
      setProduct(response.Product);
      setImageShow(response.Product.thumb);
    }
  };

  const fetchProdict = async () => {
    const response = await apiProduct({ category });

    if (response?.success) {
      setProductOther(response.Product);
    }
  };

  useEffect(() => {
    if (product_id) {
      fetchApiGetProductByProduct_id();
      fetchProdict();
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id]);

  const renderPageVote = useCallback(() => {
    setUpdatePageVote(!updatePageVote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePageVote]);

  useEffect(() => {
    fetchApiGetProductByProduct_id();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePageVote]);

  const handleAddCart = async () => {
    if (!current) {
      Swal.fire({
        title: "Đăng nhập",
        text: "Bạn cần tiến hành đăng nhập!",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
    }
    const response = await apiAddCart({
      product_id: product?._id,
      color: product?.color,
      quantity,
      price: product?.price,
      thumb: product?.thumb,
      title: product?.title,
    });
    if (response?.success) {
      toast.success(response.message);
      dispatch(getUser());
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-full mb-8">
      {!isShow && (
        <div className="h-[81px] flex justify-center items-center bg-gray-100">
          <div className="w-main">
            <h3 className="font-semibold">{title}</h3>
            <Breadcrum title={title} category={category} />
          </div>
        </div>
      )}
      <div className="w-main m-auto mt-4 flex">
        <div className="w-2/5 flex flex-col gap-4">
          <div className="w-[458px] h-[458px] border">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: imageShow,
                },
                largeImage: {
                  src: imageShow,
                  width: 1800,
                  height: 1500,
                },
              }}
            />
          </div>
          <div className="w-full">
            <Slider {...settings}>
              {product?.images?.map((item) => (
                <img
                  onClick={() => setImageShow(item)}
                  src={item}
                  alt="product sub"
                  className="h-[143px] w-[143px] border object-cover"
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-4">
          <h2 className="text-[30px] font-semibold">
            {" "}
            {`${formatMoney(formatPrice(product?.price))} VND`}
          </h2>
          <div className="flex items-center gap-1">
            {createRatings(product?.totalRatings, 20)?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
            <span className="text-sm text-main">{`(Đã bán: ${
              product?.sold || 0
            } cái)`}</span>
          </div>
          <ul className="list-square text-sm text-gray-500 pl-4">
            {product?.description?.length > 1 &&
              product?.description?.map((item) => (
                <li className="leading-6" key={item}>
                  {item}
                </li>
              ))}
            {product?.description?.length === 1 && (
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: Dompurify.sanitize(product?.description[0]),
                }}
              ></div>
            )}
          </ul>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-5">
              <span className="font-semibold">Số lượng:</span>
              <SelectQuantity
                handleChangeQuantity={handleChangeQuantity}
                quantity={quantity}
                handleInputQuantity={handleInputQuantity}
              />
              <span className="text-sm text-main">{`Còn: ${product?.quantity} cái`}</span>
            </div>
            <Button handleClick={() => handleAddCart()}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className="w-1/5">
          {productExtra?.map((item) => (
            <ProductExtra key={item.id} data={item} />
          ))}
        </div>
      </div>
      {!isShow && (
        <>
          <div className="w-main m-auto mt-8">
            <ProductInfo
              totalRatings={product?.totalRatings}
              ratings={product?.ratings}
              title={product?.title}
              product_id={product?._id}
              category={category}
              renderPageVote={renderPageVote}
            />
          </div>
          <div className="w-main m-auto mt-8">
            <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
              ORTHER CUSTOMER ALSO LIKED
            </h3>
            <CustomSlider products={productOther} />
          </div>
        </>
      )}
    </div>
  );
}

export default WithBase(memo(DetailProduct));
