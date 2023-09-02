import React from "react";
import { Slider, Section, NewRelease } from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { section1, section2, section3, section4, section5, weekChart } =
    useSelector((state) => state.app);
  console.log(weekChart);
  return (
    <div className="overflow-y-auto w-full">
      <Slider />
      <NewRelease />
      <Section data={section1} />
      <Section data={section2} />
      <Section data={section3} />
      <Section data={section4} />
      <Section data={section5} />
      <div className="w-full flex items-center px-[43px] mt-12">
        {weekChart?.map((item) => (
          <Link
            to={item.link.split(".")[0]}
            key={item.link}
            className="flex-1 px-4"
          >
            <img
              src={item.cover}
              alt="cover"
              className="w-full object-cover rounded-md"
            />
          </Link>
        ))}
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
