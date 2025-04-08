import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../../libs/axiosInterceptor";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toastNotifications";

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
        <div className="container">
          {/* Section Tittle */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>LĨNH VỰC CÔNG VIỆC NỔI BẬT</span>
                <h2>Danh Mục Nghề Nghiệp</h2>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-contnet-center">
            {loading ? (
              <p>Đang tải...</p>
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
                          style={{ width: "62px", height: "62px" }}
                        />
                      </div>
                      <div className="services-cap">
                        <h5>
                          <a href="job_listing.html">{jobType.value}</a>
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

            {/* <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-cms" />
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="job_listing.html">Design &amp; Development</a>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-report" />
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="job_listing.html">Sales &amp; Marketing</a>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-app" />
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="job_listing.html">Mobile Application</a>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-helmet" />
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="job_listing.html">Construction</a>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-high-tech" />
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="job_listing.html">Information Technology</a>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-real-estate" />
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="job_listing.html">Real Estate</a>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-content" />
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="job_listing.html">Content Writer</a>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div> */}
          </div>
          {/* More Btn */}
          {/* Section Button */}
          <div className="row">
            <div className="col-lg-12">
              <div className="browse-btn2 text-center mt-50">
                <a href="job_listing.html" className="border-btn2">
                  Browse All Sectors
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Services End */}
    </>
  );
};

export default OurServiceStart;
