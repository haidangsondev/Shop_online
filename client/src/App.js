import { Route, Routes } from "react-router-dom";
import React from "react";
import path from "utils/path";
import {
  Blog,
  Checkout,
  DetailCart,
  DetailProduct,
  Faq,
  FinalRegister,
  Home,
  Login,
  OurServices,
  Products,
  Public,
  ResetPassword,
} from "pages/public";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategories } from "redux/reduxActions/productCategoriesAction";
import { Cart, Modal } from "components";
import {
  AdminLayout,
  CreateProduct,
  Dasboard,
  ManegeOrder,
  ManegeProduct,
  ManegeUser,
} from "pages/admin";
import { History, MyCart, Profile, UserLayout, WishList } from "pages/user";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isShowModal, isShowModalChildren, isShowCart } = useSelector(
    (state) => state.app
  );

  return (
    <div className="h-screen relative">
      {isShowCart && (
        <div className="absolute inset-0 z-50 flex justify-end">
          <Cart />
        </div>
      )}
      {isShowModal && <Modal>{isShowModalChildren}</Modal>}
      <Routes>
        <Route path={path.CHECKOUT} element={<Checkout />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blog />} />
          <Route path={path.OUR_SERVICES} element={<OurServices />} />
          <Route path={path.FAQS} element={<Faq />} />
          <Route path={path.DETAIL_PRODUCT} element={<DetailProduct />} />
          <Route path={path.PRODUCTS__CATEGORY} element={<Products />} />
          <Route path={path.DETAIL_CART} element={<DetailCart />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASBOARD} element={<Dasboard />} />
          <Route path={path.MANEGE_USER} element={<ManegeUser />} />
          <Route path={path.MANEGE_PRODUCT} element={<ManegeProduct />} />
          <Route path={path.MANEGE_ORDER} element={<ManegeOrder />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>

        <Route path={path.USER} element={<UserLayout />}>
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.CART} element={<DetailCart />} />
          <Route path={path.WISHLIST} element={<WishList />} />
          <Route path={path.HISTORY} element={<History />} />
        </Route>

        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
