import React from "react";
const logo = "assets/img/gallery/how-applybg.png";

const ApplyProcess = () => {
  return (
    <>
      {/* How  Apply Process Start*/}
      <div
        className="section-overly2 apply-process-area apply-bg"
        style={{ paddingTop: "60px", padding: "60px" }}
      >
        <div className="container">
          {/* Section Tittle */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-titttle white-text text-center">
                <span style={{ color: "#47b2e4" }}>QUY TRÌNH TÌM VIỆC</span>
                <h2
                  style={{
                    color: "#37517e",
                    fontWeight: "700",
                    fontSize: "24px",
                  }}
                >
                  THỰC HIỆN NHƯ THẾ NÀO?
                </h2>
              </div>
            </div>
          </div>
          {/* Apply Process Caption */}
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-search" />
                </div>
                <div className="process-cap">
                  <h5>1. Tìm kiếm công việc</h5>
                  <p>
                    Dễ dàng tìm kiếm các công việc phù hợp với kỹ năng và kinh
                    nghiệm của bạn thông qua hệ thống tìm kiếm thông minh với
                    nhiều bộ lọc chuyên nghiệp.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-curriculum-vitae" />
                </div>
                <div className="process-cap">
                  <h5>2. Ứng tuyển công việc</h5>
                  <p>
                    Nộp hồ sơ ứng tuyển nhanh chóng chỉ với vài thao tác, hệ
                    thống sẽ tự động gửi CV của bạn đến nhà tuyển dụng và thông
                    báo kết quả sớm nhất.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-tour" />
                </div>
                <div className="process-cap">
                  <h5>3. Nhận công việc</h5>
                  <p>
                    Sau khi được chấp nhận, bạn sẽ nhận được thông báo chi tiết
                    về công việc, mức lương và các chế độ đãi ngộ đi kèm để bắt
                    đầu làm việc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* How  Apply Process End*/}
    </>
  );
};

export default ApplyProcess;
