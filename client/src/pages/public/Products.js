import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiProduct } from "apis";
import { useEffect, useState, useCallback } from "react";
import {
  Breadcrum,
  InputSelect,
  Pagination,
  Product,
  SearchItem,
} from "components";
import Masonry from "react-masonry-css";
import { optionsSelect } from "utils/constant";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [active, setActive] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  const fetchApi = async (queries) => {
    if (category && category !== "products") queries.category = category;
    const response = await apiProduct(queries);
    if (response?.success) setProducts(response);
  };

  useEffect(() => {
    let param = [];
    let queriesFilter = {};
    let queriesPrice = {};

    for (let item of params.entries()) {
      param.push(item);
    }

    for (let item of param) {
      queriesFilter[item[0]] = item[1];
    }

    if (queriesFilter.from && queriesFilter.to) {
      queriesPrice = {
        $and: [
          { price: { gte: queriesFilter.from } },
          { price: { lte: queriesFilter.to } },
        ],
      };
      delete queriesFilter.price;
    } else {
      if (queriesFilter.from) queriesFilter.price = { gte: queriesFilter.from };
      if (queriesFilter.to) queriesFilter.price = { lte: queriesFilter.to };
    }

    delete queriesFilter.from;
    delete queriesFilter.to;

    fetchApi({ ...queriesFilter, ...queriesPrice });
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleChangeActive = useCallback(
    (name) => {
      if (active === name) setActive(null);
      else setActive(name);
    },
    [active]
  );

  const changeInputSelect = useCallback(
    (value) => {
      setSort(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sort]
  );

  useEffect(() => {
    if (sort !== "") {
      navigate({
        path: `/${category}`,
        search: createSearchParams({ sort }).toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);
  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gary-100">
        <div className="w-main">
          <Breadcrum category={category} />
        </div>
      </div>
      <div className="w-main border  p-4 flex justify-between mt-8 m-auto">
        <div className="w-4/5  flex-auto  flex flex-col ">
          <span className="font-semibold mb-1">Filter by:</span>
          <div className="flex items-center gap-4">
            <SearchItem
              handleChangeActive={handleChangeActive}
              active={active}
              name="price"
              type="input"
            />
            <SearchItem
              handleChangeActive={handleChangeActive}
              active={active}
              name="color"
            />
          </div>
        </div>
        <div className="w-1/5 flex flex-col gap-3">
          <span className="font-semibold text-sm">Sort by:</span>
          <div className="w-full">
            <InputSelect
              value={sort}
              options={optionsSelect}
              changeInputSelect={changeInputSelect}
            />
          </div>
        </div>
      </div>
      <div className="w-main mt-8">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {products?.Product?.map((item) => (
            <Product key={item._id} data={item} />
          ))}
        </Masonry>
      </div>
      <div className="flex justify-center w-main  m-auto my-4">
        <Pagination totalCount={products?.counts} />
      </div>
    </div>
  );
}

export default Products;
