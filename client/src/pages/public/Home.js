// import { useSelector } from "react-redux";

import {
  Banner,
  BestSeller,
  DealDaily,
  HotCollection,
  NewArrival,
  ProductFeature,
  Slider,
} from "components";

function Home() {
  // const {  current } = useSelector((state) => state.user);

  return (
    <div>
      <div className="w-main flex font-se ">
        <div className="flex flex-col gap-5 w-[20%] flex-auto">
          <Slider />
          {/* <DealDaily /> */}
        </div>
        <div className="flex flex-col gap-5 pl-2.5 w-[80%] flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="mt-4">
        <ProductFeature />
      </div>
      <div className="mt-4">
        <NewArrival />
      </div>
      <div className="mt-4">
        <HotCollection />
      </div>
    </div>
  );
}

export default Home;
