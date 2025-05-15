import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../../libs/axiosInterceptor";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toastNotifications";
import { Link } from "react-router-dom";
import LoadingPage from "../../pages/loading-page/LoadingPage";

const OurServiceStart = () => {
  const [jobs, setJob] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get(
          `/job-types-count?limit=10&offset=0`
        );

        if (response.status === 200) {
          const jobData = response.data.data;
          setJob(jobData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        showErrorToast("Không thể tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      {/* section-pad-t30 */}
      <div className="our-services" style={{ padding: "4rem 0" }}>
        <div style={{ border: "1px solid #ccc" }} className="container">
          {/* Section Tittle */}
          <div style={{ background: "#f5f5f5" }} className="row">
            <div style={{ height: "66px" }} className="col-lg-12">
              <div className="section-tittle text-left">
                {/* <span>Lĩnh vực công việc nổi bật</span> */}
                <h2 style={{ lineHeight: "66px" }}>DANH MỤC NGHỀ NGHIỆP</h2>
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: "1rem" }}
            className="row d-flex justify-contnet-center"
          >
            {loading ? (
              <LoadingPage />
            ) : jobs && jobs.length > 0 ? (
              jobs.map((job) => {
                const jobType = job.postDetailData.jobTypePostData;
                return (
                  <div
                    key={jobType.code}
                    className="col-xl-3 col-lg-3 col-md-4 col-sm-6"
                  >
                    <div className="single-services text-center mb-30">
                      <div className="services-ion">
                        <img
                          src={jobType.image}
                          alt={jobType.value}
                          style={{ width: "120px", height: "120px" }}
                        />
                      </div>
                      <div
                        style={{ marginTop: "6px" }}
                        className="services-cap"
                      >
                        <h5>
                          <a>{jobType.value}</a>
                        </h5>
                        <span>({job.amount})</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Không có dữ liệu loại công việc.</p>
            )}
          </div>
          {/* More Btn */}
          {/* Section Button */}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="browse-btn2 text-center mt-50">
              <Link to="/job" className=" btn-all-job">
                Xem tất cả việc làm
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Our Services End */}
    </>
  );
};

export default OurServiceStart;
