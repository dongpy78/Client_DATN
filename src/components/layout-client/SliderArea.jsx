import React from "react";
import "/public/assets/css/nice-select.css";
const logo = "/assets/img/hero/h1_hero.jpg";
const logo1 = "/assets/img/hero/bg-form.png";
import "../../styles/main.css";

const SliderArea = () => {
  return (
    <>
      <div id="hero" className="hero section-123 dark-background">
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
              data-aos="zoom-out"
            >
              <h1 className="hero-heading">
                Kết Nối Cơ Hội Việc Làm IT Tốt Nhất
              </h1>
              <p className="hero-description">
                Tìm kiếm công việc IT mơ ước hoặc tuyển dụng nhân tài xuất sắc
                với hệ thống website của chúng tôi minh của chúng tôi.
              </p>
              <div className="d-flex">
                <a href="#about" className="btn-get-started">
                  Bắt Đầu Ngay
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox btn-watch-video d-flex align-items-center"
                >
                  <i className="bi bi-play-circle" />
                </a>
              </div>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-out"
              data-aos-delay={200}
            >
              <img
                src="/hero-img.png"
                className="img-fluid animated"
                alt="Tìm việc IT"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderArea;
