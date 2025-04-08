import React from "react";
const logo = "assets/img/hero/about.jpg";
const logo1 = "/assets/img/hero/bg-form.png";

const HeroCompany = () => {
  return (
    <>
      {/* Hero Area Start*/}
      <div className="slider-area ">
        <div
          className="single-slider  slider-height2 d-flex align-items-center"
          style={{ backgroundImage: `url(${logo1})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  {/* <h2>Single Blog</h2> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Area End */}
    </>
  );
};

export default HeroCompany;
