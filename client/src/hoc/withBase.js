/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const WithBase = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <Component
      {...props}
      navigate={navigate}
      dispatch={dispatch}
      location={location}
    />
  );
};

export default WithBase;
