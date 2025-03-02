import React from "react";

const FeaturedJobArea = () => {
  return (
    <>
      {/* Featured_job_start */}
      <section className="featured-job-area feature-padding">
        <div className="container">
          {/* Section Tittle */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>CÁC CÔNG VIỆC ĐANG CHỜ BẠN</span>
                <h2>Công Việc Nổi Bật</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-10">
              {/* single-job-content */}
              <div className="single-job-items mb-30">
                <div className="job-items">
                  <div className="company-img">
                    <a href="job_details.html">
                      <img src="assets/img/icon/job-list1.png" alt="" />
                    </a>
                  </div>
                  <div className="job-tittle">
                    <a href="job_details.html">
                      <h4>Digital Marketer</h4>
                    </a>
                    <ul>
                      <li>Creative Agency</li>
                      <li>
                        <i className="fas fa-map-marker-alt" />
                        Athens, Greece
                      </li>
                      <li>$3500 - $4000</li>
                    </ul>
                  </div>
                </div>
                <div className="items-link f-right">
                  <a href="job_details.html">Full Time</a>
                  <span>7 hours ago</span>
                </div>
              </div>
              {/* single-job-content */}
              <div className="single-job-items mb-30">
                <div className="job-items">
                  <div className="company-img">
                    <a href="job_details.html">
                      <img src="assets/img/icon/job-list2.png" alt="" />
                    </a>
                  </div>
                  <div className="job-tittle">
                    <a href="job_details.html">
                      <h4>Digital Marketer</h4>
                    </a>
                    <ul>
                      <li>Creative Agency</li>
                      <li>
                        <i className="fas fa-map-marker-alt" />
                        Athens, Greece
                      </li>
                      <li>$3500 - $4000</li>
                    </ul>
                  </div>
                </div>
                <div className="items-link f-right">
                  <a href="job_details.html">Full Time</a>
                  <span>7 hours ago</span>
                </div>
              </div>
              {/* single-job-content */}
              <div className="single-job-items mb-30">
                <div className="job-items">
                  <div className="company-img">
                    <a href="job_details.html">
                      <img src="assets/img/icon/job-list3.png" alt="" />
                    </a>
                  </div>
                  <div className="job-tittle">
                    <a href="job_details.html">
                      <h4>Digital Marketer</h4>
                    </a>
                    <ul>
                      <li>Creative Agency</li>
                      <li>
                        <i className="fas fa-map-marker-alt" />
                        Athens, Greece
                      </li>
                      <li>$3500 - $4000</li>
                    </ul>
                  </div>
                </div>
                <div className="items-link f-right">
                  <a href="job_details.html">Full Time</a>
                  <span>7 hours ago</span>
                </div>
              </div>
              {/* single-job-content */}
              <div className="single-job-items mb-30">
                <div className="job-items">
                  <div className="company-img">
                    <a href="job_details.html">
                      <img src="assets/img/icon/job-list4.png" alt="" />
                    </a>
                  </div>
                  <div className="job-tittle">
                    <a href="job_details.html">
                      <h4>Digital Marketer</h4>
                    </a>
                    <ul>
                      <li>Creative Agency</li>
                      <li>
                        <i className="fas fa-map-marker-alt" />
                        Athens, Greece
                      </li>
                      <li>$3500 - $4000</li>
                    </ul>
                  </div>
                </div>
                <div className="items-link f-right">
                  <a href="job_details.html">Full Time</a>
                  <span>7 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured_job_end */}
    </>
  );
};

export default FeaturedJobArea;
