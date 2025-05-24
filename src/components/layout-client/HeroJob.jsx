import React from "react";
const logo = "assets/img/hero/about.jpg";
const logo1 = "/assets/img/hero/bg-form.png";

const HeroJob = () => {
  return (
    <>
      {/* Hero Area Start*/}
      <div className="slider-area ">
        <div className="single-slider d-flex align-items-center">
          <img style={{ width: "100%", height: "auto" }} src={logo1} />
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  {/* <h2>Get your job</h2> */}
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

export default HeroJob;
