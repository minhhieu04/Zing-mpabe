import React from "react";
import {
  Slider,
  Section,
  NewRelease,
  Top100,
  ChartSection,
} from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../components";

const Home = () => {
  const {
    section1,
    section2,
    section3,
    section4,
    section5,
    weekChart,
    top100,
  } = useSelector((state) => state.app);
  return (
    <>
      {section1 &&
      section2 &&
      section3 &&
      section4 &&
      section5 &&
      weekChart &&
      top100 ? (
        <div className="overflow-y-auto w-full">
          <div className="w-full h-[70px]"></div>
          <Slider />
          <NewRelease />
          <Section data={section1} />
          <Section data={section2} />
          <Section data={section3} />
          <Section data={section4} />
          <Section data={section5} />
          <ChartSection />
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
          <Top100 data={top100} />
          <div className="w-full h-[500px]"></div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default Home;
