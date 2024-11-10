import SelectQuantity from "components/Other/SelectQuantity";
import WithBase from "hoc/withBase";
import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateCart } from "redux/reduxSlice/userSlice";
import { formatMoney } from "utils/helper";

function QuantityOption({ data, dispatch, defaultQuantity }) {
  const [quantity, setQuantity] = useState(() => defaultQuantity);
  const handleInputQuantity = useCallback(
    (number) => {
      if (+number > 1) {
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
      if (flag === "minus") setQuantity((pre) => +pre - 1);
      if (flag === "plus") setQuantity((pre) => +pre + 1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quantity]
  );
  useEffect(() => {
    dispatch(updateCart({ product_id: data?.product?._id, quantity }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);
  return (
    <div className="text-center">
      <SelectQuantity
        handleChangeQuantity={handleChangeQuantity}
        quantity={quantity}
        handleInputQuantity={handleInputQuantity}
      />
    </div>
  );
}

export default WithBase(memo(QuantityOption));
