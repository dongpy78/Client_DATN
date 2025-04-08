import React from "react";
import "/public/assets/css/nice-select.css";
const logo = "/assets/img/hero/h1_hero.jpg";
const logo1 = "/assets/img/hero/bg-form.png";

const SliderArea = () => {
  return (
    <>
      {/* slider Area Start*/}
      <div className="slider-area ">
        {/* Mobile Menu */}
        <div className="slider-active">
          <div
            className="single-slider  d-flex align-items-center"
            style={{ backgroundImage: `url(${logo1})`, height: "420px " }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-9 col-md-10">
                  <div className="hero__caption">
                    <h1></h1>
                    {/* <h1>Hãy tìm công việc phù hợp với bạn nào</h1> */}
                  </div>
                </div>
              </div>
              {/* Search Box */}
              <div className="row">
                <div className="col-xl-8">
                  {/* form */}
                  {/* <form action="#" className="search-box">
                    <div className="input-form">
                      <input type="text" placeholder="Job Tittle or keyword" />
                    </div>
                    <div className="select-form">
                      <div className="select-itms">
                        <select name="select" id="select1">
                          <option value="">Location BD</option>
                          <option value="">Location PK</option>
                          <option value="">Location US</option>
                          <option value="">Location UK</option>
                        </select>
                      </div>
                    </div>
                    <div className="search-form">
                      <a href="#">Find job</a>
                    </div>
                  </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* slider Area End*/}
    </>
  );
};

export default SliderArea;
