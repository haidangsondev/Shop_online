import { memo } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import icons from "utils/icons";

const { IoIosArrowForward } = icons;
function Breadcrum({ title, category }) {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:product_id/:title", breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="flex items-center gap-1 text-sm">
      {breadcrumbs
        ?.filter((item) => !item.match.route === false)
        .map(({ match, breadcrumb }, index, sefl) => (
          <Link
            className="flex gap-1 items-center hover:text-main"
            key={match.pathname}
            to={match.pathname}
          >
            <span className="capitalize">{breadcrumb}</span>
            {index !== sefl.length - 1 && <IoIosArrowForward />}
          </Link>
        ))}
    </div>
  );
}

export default memo(Breadcrum);
