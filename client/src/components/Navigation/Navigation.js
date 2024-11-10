import { memo } from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "utils/constant";

function Navigation() {
  return (
    <div className="w-main h-[48px] py-2 mb-5 border-y">
      {navigation.map((item) => (
        <NavLink
          to={item.path}
          key={item.id}
          className={({ isActive }) =>
            isActive
              ? "pr-12 font-semibold hover:text-main text-main"
              : "pr-12 font-semibold hover:text-main"
          }
        >
          {item.value}
        </NavLink>
      ))}
    </div>
  );
}

export default memo(Navigation);
