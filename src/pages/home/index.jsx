import React from "react";
import SliderArea from "../../components/layout-client/SliderArea";
import OurServiceStart from "../../components/layout-client/OurServiceStart";
import OnlineCVArea from "../../components/layout-client/OnlineCVArea";
import FeaturedJobArea from "../../components/layout-client/home/FeaturedJobsArea";
import ApplyProcess from "../../components/layout-client/ApplyProcess";

const Home = () => {
  return (
    <>
      <SliderArea />
      <OurServiceStart />
      <OnlineCVArea />
      <FeaturedJobArea />
      <ApplyProcess />
    </>
  );
};

export default Home;
