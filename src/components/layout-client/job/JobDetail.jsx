import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import CommonUtils from "../../../utils/CommonUtils";
import { getDetailPostByIdService } from "../../../services/userService";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../utils/toastNotifications";

const DetailJob = () => {
  // const history = useHistory();
  const { id } = useParams();
  const [isActiveModal, setAcitveModal] = useState(false);
  const [dataPost, setDataPost] = useState(null);

  const fetchPost = async (id) => {
    try {
      const response = await getDetailPostByIdService(id);
      if (response && response.data) {
        setDataPost(response.data); // Lưu dữ liệu từ API vào state
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
      showErrorToast("Failed to fetch post details.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  if (!dataPost) {
    return <p>Loading...</p>; // Hiển thị loading khi dữ liệu chưa được fetch
  }

  return (
    <>
      <>
        {/* Hero Area Start*/}
        <div className="slider-area ">
          <div
            className="single-slider section-overly slider-height2 d-flex align-items-center"
            style={{
              backgroundImage: `url(${dataPost.companyData.coverimage})`,
              backgroundSize: "cover", // Đảm bảo hình ảnh phủ kín phần tử
              backgroundPosition: "center", // Căn giữa hình ảnh
              backgroundRepeat: "no-repeat", // Không lặp lại hình ảnh
              height: "450px",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap text-center">
                    <h2></h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero Area End */}
        {/* job post company Start */}
        <div className="job-post-company pt-120 pb-120">
          <div className="container">
            <div className="row justify-content-between">
              {/* Left Content */}
              <div className="col-xl-7 col-lg-8">
                {/* job single */}
                <div className="single-job-items mb-50">
                  <div className="job-items">
                    <div className="company-img company-img-details">
                      <a href="#">
                        <img
                          src={dataPost.companyData.thumbnail}
                          width={100}
                          height={100}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="job-tittle">
                      <a href="#">
                        <h4>{dataPost.postDetailData.name}</h4>
                      </a>
                      <ul>
                        <li>
                          {dataPost.postDetailData.workTypePostData.value}
                        </li>
                        <li>
                          <i className="fas fa-map-marker-alt" />
                          {dataPost.postDetailData.provincePostData.value}
                        </li>
                        <li>
                          {dataPost.postDetailData.salaryTypePostData.value}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* job single End */}
                <div className="job-post-details">
                  <div className="post-details1 mb-50">
                    {/* Small Section Tittle */}
                    <div className="small-section-tittle">
                      <h4>Mô tả công việc</h4>
                    </div>
                    {/* <p>
                      It is a long established fact that a reader will beff
                      distracted by vbthe creadable content of a page when
                      looking at its layout. The pointf of using Lorem Ipsum is
                      that it has ahf mcore or-lgess normal distribution of
                      letters, as opposed to using, Content here content here
                      making it look like readable.
                    </p> */}

                    <div
                      dangerouslySetInnerHTML={{
                        __html: dataPost.postDetailData.descriptionHTML,
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Right Content */}
              <div className="col-xl-4 col-lg-4">
                <div className="post-details3  mb-50">
                  {/* Small Section Tittle */}
                  <div className="small-section-tittle">
                    <h4>Thông tin công việc</h4>
                  </div>
                  <ul>
                    <li>
                      Lĩnh vực :
                      <span>
                        {dataPost.postDetailData.jobTypePostData.value}
                      </span>
                    </li>
                    <li>
                      Nơi làm việc :
                      <span>
                        {dataPost.postDetailData.provincePostData.value}
                      </span>
                    </li>
                    <li>
                      Hình thức làm việc :
                      <span>
                        {dataPost.postDetailData.workTypePostData.value}
                      </span>
                    </li>
                    <li>
                      Kinh nghiệm:
                      <span>
                        {dataPost.postDetailData.expTypePostData.value}
                      </span>
                    </li>
                    <li>
                      Lương :{" "}
                      <span>
                        {dataPost.postDetailData.salaryTypePostData.value}
                      </span>
                    </li>
                    <li>
                      Hạn nộp :{" "}
                      <span>
                        {new Date(dataPost.timeEnd).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </li>
                  </ul>
                  <div className="apply-btn2">
                    <a href="#" className="btn-user head-btn1">
                      Ứng tuyển ngay
                    </a>
                  </div>
                </div>
                <div className="post-details4  mb-50">
                  {/* Small Section Tittle */}
                  <div className="small-section-tittle">
                    <h4>Thông tin công ty</h4>
                  </div>
                  {/* <span>Tên công ty: {dataPost.companyData.name}</span> */}
                  <ul>
                    <li>
                      Tên công ty: <span>{dataPost.companyData.name}</span>
                    </li>
                    <li>
                      Website: <span>{dataPost.companyData.website} </span>
                    </li>
                    <li>
                      Địa chỉ : <span>{dataPost.companyData.address}</span>
                    </li>
                    <li>
                      Điện thoại:
                      <span>{dataPost.companyData.phonenumber}</span>
                    </li>
                    <li>
                      Mã số thuế: <span>{dataPost.companyData.taxnumber}</span>
                    </li>
                    <li>
                      Số lượng nhân viên :
                      <span>{dataPost.companyData.amountEmployer}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* job post company End */}
      </>
    </>
  );
};

export default DetailJob;
