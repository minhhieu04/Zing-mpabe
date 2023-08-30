import React from "react";
import { Slider, Section, NewRelease } from "../../components";
import { useSelector } from "react-redux";

const Home = () => {
  const { section1, section2, section3, section4, section5 } = useSelector(
    (state) => state.app
  );
  return (
    <div className="overflow-y-auto w-full">
      <Slider />
      <NewRelease />
      <Section data={section1} />
      <Section data={section2} />
      <Section data={section3} />
      <Section data={section4} />
      <Section data={section5} />
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
