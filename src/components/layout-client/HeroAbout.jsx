import React from "react";
const logo = "assets/img/hero/about.jpg";
const logo1 = "/assets/img/hero/bg-form.png";

import "../../styles/contact.css";
import HeroJob from "./HeroJob";

const HeroAbout = () => {
  return (
    <>
      <HeroJob />

      <div className="container" style={{ minHeight: "85vh" }}>
        <section className="inner-page-detail">
          <h1 className="heading-title">Liên hệ</h1>

          <div className="page-des">
            <b>
              <p>
                <span style={{ color: "#555" }}>
                  Cám ơn bạn đã ghé thăm website <strong>Techworks.vn </strong>{" "}
                  – Cổng thông tin việc làm IT của chúng tôi.
                </span>
              </p>
            </b>
          </div>

          <div className="page-content">
            <p>
              <strong>Techworks</strong> .vn là website cung cấp các thông tin
              về việc làm - nhân sự lĩnh vực công nghệ
            </p>

            <p>
              <strong>Bộ phận Tư Vấn Nghề Nghiệp</strong>
            </p>

            <ul>
              <li
                style={{
                  lineHeight: "26px",

                  color: "#555",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#f7941d" }}>
                  Mobile:{" "}
                  <span style={{ color: "#000", fontWeight: "normal" }}>
                    0982781867
                  </span>
                </span>
              </li>
              <li
                style={{
                  lineHeight: "26px",

                  color: "#555",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#f7941d" }}>
                  Email:{" "}
                  <span style={{ color: "#000", fontWeight: "normal" }}>
                    itvandong78py@gmail.com
                  </span>
                </span>
              </li>
              <li
                style={{
                  lineHeight: "26px",

                  color: "#555",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#f7941d" }}>
                  Facebook:{" "}
                  <a
                    target="_blank"
                    style={{ color: "#3598db", fontWeight: "normal" }}
                  >
                    https://www.facebook.com/
                  </a>
                </span>
              </li>
              <li
                style={{
                  lineHeight: "26px",

                  color: "#555",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#f7941d" }}>
                  Messenger:{" "}
                  <a
                    target="_blank"
                    style={{ color: "#3598db", fontWeight: "normal" }}
                  >
                    https://www.facebook.com/
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default HeroAbout;
