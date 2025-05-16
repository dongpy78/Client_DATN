import React from "react";
const logo = "/assets/img/gallery/cv_bg.jpg";
const logo1 = "/assets/img/gallery/job-image11.jpg";

const OnlineCVArea = () => {
  return (
    <>
      {/* Online CV Area Start */}
      <div
        className="online-cv cv-bg section-overly pt-90 pb-120"
        style={{ backgroundImage: `url(${logo1})` }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="cv-caption text-center">
                <p className="pera1">NHIỀU CÔNG VIỆC ĐANG CHỜ BẠN</p>
                <p className="pera2">BẠN ĐÃ HỨNG THÚ ĐỂ TÌM VIỆC LÀM CHƯA</p>
                <a href="#" className="border-btn2 border-btn4">
                  Tìm Việc Ngay Hôm Nay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Online CV Area End*/}
    </>
  );
};

export default OnlineCVArea;
