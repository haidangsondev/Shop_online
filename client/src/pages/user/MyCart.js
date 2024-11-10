import WithBase from "hoc/withBase";
import { memo } from "react";

function Cart(props) {
  console.log(props);
  return <div>Cart</div>;
}

export default memo(WithBase(Cart));
