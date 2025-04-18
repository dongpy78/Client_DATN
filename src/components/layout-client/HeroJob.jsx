import React from "react";
const logo = "assets/img/hero/about.jpg";
const logo1 = "/assets/img/hero/bg-form.png";

const HeroJob = () => {
  return (
    <>
      {/* Hero Area Start*/}
      <div className="slider-area ">
        <div
          className="single-slider d-flex align-items-center"
          style={{
            backgroundImage: `url(${logo1})`,
            maxWidth: "100%",
            minHeight: "50vh",
            backgroundSize: "cover", // hoặc "contain"
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            verticalAlign: "middle",
          }}
        >
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
