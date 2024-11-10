import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { memo } from "react";
import WithBase from "hoc/withBase";
import { createSearchParams } from "react-router-dom";

function HotCollection({ navigate }) {
  const { productCategories } = useSelector((state) => state.app);

  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        HOT COLLECTION
      </h3>
      <div className="flex flex-wrap gap-4 mt-4">
        {productCategories
          ?.filter((item) => item.brand.length > 0)
          ?.map((item) => (
            <div className="w-[396px]" key={item._id}>
              <div className="border flex p-4 gap-4 min-h-[190px]">
                <img
                  src={item.image}
                  alt="product"
                  className="w-[144px] h-[129px] flex-1 object-cover"
                />
                <div className="flex-1 text-gray-700">
                  <h4 className="font-semibold uppercase">{item.title}</h4>
                  <ul className="text-sm">
                    {item?.brand?.map((element) => (
                      <span
                        className="cursor-pointer flex gap-1 items-center text-gray-500 hover:text-main hover:underline "
                        onClick={() =>
                          navigate({
                            pathname: `/${item.title}`,
                            search: createSearchParams({
                              brand: element,
                            }).toString(),
                          })
                        }
                      >
                        <IoIosArrowForward size={14} key={element} />
                        {element}
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WithBase(memo(HotCollection));
