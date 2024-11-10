import clsx from "clsx";
import { memo } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

function PaginationChildren({ children }) {
  const [params] = useSearchParams();
  const { category } = useParams();
  const navigate = useNavigate();

  const isActive = params.get("page");
  const handlePagination = () => {
    let param = [];
    let queries = {};

    for (let item of params.entries()) {
      param.push(item);
    }

    for (let item of param) {
      queries[item[0]] = item[1];
    }
    if (Number(children)) queries.page = children;

    navigate({
      path: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      className={clsx(
        "w-10 h-10 cursor-pointer flex justify-center",
        !Number(children) && "items-center pt-2 ",
        Number(children) &&
          "items-center hover:rounded-full hover:bg-main hover:text-white",
        +isActive === +children && "rounded-full bg-main  text-white",
        !+isActive && children === 1 && "rounded-full bg-main  text-white"
      )}
      disabled={!Number(children)}
      onClick={handlePagination}
    >
      {children}
    </button>
  );
}

export default memo(PaginationChildren);
