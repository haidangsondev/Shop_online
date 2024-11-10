import { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "redux/reduxSlice/productCategoriesSlice";

function Modal({ children }) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(showModal({ isisShowModal: false, isShowModalChildren: null }))
      }
      className="absolute inset-0 bg-black opacity-90 z-50 flex items-center justify-center"
    >
      {children}
    </div>
  );
}

export default memo(Modal);
