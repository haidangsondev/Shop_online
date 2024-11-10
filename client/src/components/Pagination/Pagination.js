import useNavigation from "hook/useNavigation";
import { PaginationChildren } from "components/index";
import { memo } from "react";
import { useSearchParams } from "react-router-dom";

function Pagination({ totalCount }) {
  const [params] = useSearchParams();
  const pagination = useNavigation(totalCount, +params.getAll("page") || 1);
  return (
    <div className="flex items-center">
      {pagination?.map((item) => (
        <PaginationChildren key={item}>{item}</PaginationChildren>
      ))}
    </div>
  );
}

export default memo(Pagination);
