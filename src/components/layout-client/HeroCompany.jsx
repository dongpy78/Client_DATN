import React from "react";
const logo = "assets/img/hero/about.jpg";

const HeroCompany = () => {
  return (
    <>
      {/* Hero Area Start*/}
      <div className="slider-area ">
        <div
          className="single-slider section-overly slider-height2 d-flex align-items-center"
          style={{ backgroundImage: `url(${logo})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Single Blog</h2>
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
