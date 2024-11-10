import icons from "utils/icons.js";
import { apiProduct } from "apis/product.js";
import { memo, useState, useEffect } from "react";
import { createRatings, formatMoney } from "utils/helper.js";
import { CountDown } from "components";
import none from "img/none.png";
const { FaStar, IoMenu } = icons;

let idInterval;
function DealDaily() {
  const [dealDaily, setDealDaily] = useState(null);
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  const [second, setSecond] = useState(null);
  const [expireTime, setExpireTime] = useState(false);

  const fetchApiGetProductDealDaily = async () => {
    const response = await apiProduct({
      limit: 1,
      page: Math.round(Math.random() * 20),
      totalRatings: 4,
    });
    const getHour = 24 - new Date().getHours();
    const getMinute = 60 - new Date().getMinutes();
    const getSecond = 59 - new Date().getSeconds();
    if (response?.success) {
      setDealDaily(response.Product[0]);
      setSecond(getSecond);
      setMinute(getMinute);
      setHour(getHour);
    }
  };
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchApiGetProductDealDaily();
  }, [expireTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((pre) => pre - 1);
      else {
        if (minute > 0) {
          setMinute((pre) => pre - 1);
          setSecond(60);
        } else {
          if (hour > 0) {
            setHour((pre) => pre - 1);
            setSecond(59);
            setMinute(60);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => clearInterval(idInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [second, minute, hour]);

  return (
    <div className="w-full border flex-auto ">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center ">
          <FaStar size={20} color="red" />
        </span>
        <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-600 ">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>

      <div className="w-full flex flex-col items-center pt-8 gap-2">
        <img
          src={dealDaily?.thumb || none}
          className="w-[274px] h-[274px] object-cover"
          alt="product"
        />
        <span className="line-clamp-1">{dealDaily?.title}</span>
        <span>
          {`${formatMoney(dealDaily?.price ? dealDaily.price : 0)} VND`}{" "}
        </span>
        <span className="flex h-4">
          {createRatings(dealDaily?.totalRatings, 20)?.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </span>
      </div>
      <div className="mt-8 px-4">
        <div className="flex justify-center items-center gap-4 mb-4">
          <CountDown number={hour} unix="hour" />
          <CountDown number={minute} unix="minute" />
          <CountDown number={second} unix="second" />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white py-2"
        >
          <IoMenu />
          <span>Option</span>
        </button>
      </div>
    </div>
  );
}

export default memo(DealDaily);
