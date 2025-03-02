import React from "react";
import HeroAbout from "../../components/layout-client/HeroAbout";
import AboutSupportCompany from "../../components/layout-client/AboutSupportCompany";
import ApplyProcess from "../../components/layout-client/ApplyProcess";
import OnlineCVArea from "../../components/layout-client/OnlineCVArea";
import TestimonialAbout from "../../components/layout-client/TestimonialAbout";
import BlogAreaAbout from "../../components/layout-client/BlogAreaAbout";

const About = () => {
  return (
    <>
      <main>
        <HeroAbout />
        <AboutSupportCompany />
        <ApplyProcess />
        <TestimonialAbout />
        <OnlineCVArea />
        <BlogAreaAbout />
      </main>
    </>
  );
};

export default About;
