import { useEffect, useState } from "react";
import icons from "utils/icons";
import { colorProduct } from "utils/constant";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { memo } from "react";
import { apiProduct } from "apis";
import useDebounce from "hook/useDebounce";
const { FaAngleDown } = icons;

function SearchItem({ name, active, handleChangeActive, type = "checkbox" }) {
  const [selected, setSelected] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [priceInput, setPriceInput] = useState({
    from: "",
    to: "",
  });
  const navigate = useNavigate();
  const { category } = useParams();
  const [params] = useSearchParams();

  const fetchApiPrice = async () => {
    const response = await apiProduct({ sort: "-price", limit: 1 });
    if (response?.success) setBestPrice(response.Product[0].price);
  };

  useEffect(() => {
    let param = [];
    let queries = {};

    for (let item of params.entries()) {
      param.push(item);
    }

    for (let item of param) {
      queries[item[0]] = item[1];
    }
    if (selected.length > 0) {
      queries.color = selected.join(",");
      queries.page = 1;
    } else {
      delete queries.color;
    }
    navigate({
      path: `/${category}`,
      search: createSearchParams(queries).toString(),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (type === "input") fetchApiPrice();
  }, [type]);

  const handleClick = (e) => {
    handleChangeActive(null);
    const checkIsChecked = selected.find((item) => item === e.target.value);
    if (checkIsChecked)
      setSelected((pre) => pre.filter((item) => item !== e.target.value));
    else setSelected((pre) => [...pre, e.target.value]);
  };

  const debouncedValueFrom = useDebounce(priceInput.from, 2000);
  const debouncedValueTo = useDebounce(priceInput.to, 2000);

  useEffect(() => {
    let param = [];
    let queries = {};
    for (let item of params.entries()) {
      param.push(item);
    }
    for (let item of param) {
      queries[item[0]] = item[1];
    }
    if (Number(priceInput.from) > 0) queries.from = priceInput.from;
    if (Number(priceInput.to) > 0) queries.to = priceInput.to;
    navigate({
      path: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValueFrom, debouncedValueTo]);
  useEffect(() => {
    if (priceInput.from && priceInput.to && priceInput.from > priceInput.to) {
      alert("Tìm kiếm giá tiền không hợp lệ!");
    }
  }, [priceInput]);
  return (
    <div
      onClick={() => handleChangeActive(name)}
      className="curser-pointer p-3 text-gray-500 text-xs gap-6 relative border border-gray-600 flex justify-between items-center"
    >
      <span>{name}</span>
      <FaAngleDown />
      {active === name && (
        <div className="z-10 absolute top-[calc(100%+1px)] left-0 w-fit p-4 bg-gray-200 border">
          {type === "checkbox" && (
            <div>
              <div className="p-4 flex items-center justify-between gap-8">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  className="underline hover:text-main cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                >
                  Reset
                </span>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-3 mt-4"
              >
                {colorProduct?.map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      value={item}
                      onChange={handleClick}
                      checked={selected.some((itemCheck) => itemCheck === item)}
                      className="w-4 h-4 text-blue-500 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label className="capitalize text-gray-700 " htmlFor={item}>
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              {" "}
              <div className="p-4 flex items-center justify-between gap-8">
                <span className="whitespace-nowrap">{`The highest price is ${Number(
                  bestPrice
                ).toLocaleString()} VND`}</span>
                <span
                  className="underline hover:text-main cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                    setPriceInput({ from: "", to: "" });
                    handleChangeActive(null);
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="form">From:</label>
                  <input
                    className="form-input py-2"
                    type="number"
                    id="from"
                    value={priceInput.form}
                    onChange={(e) =>
                      setPriceInput((pre) => ({ ...pre, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To:</label>
                  <input
                    className="form-input py-2"
                    type="number"
                    id="to"
                    value={priceInput.to}
                    onChange={(e) =>
                      setPriceInput((pre) => ({ ...pre, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(SearchItem);
