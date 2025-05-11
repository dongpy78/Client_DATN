import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailCvService } from "../../services/cvService";
import { getFromLocalStorage } from "../../utils/localStorage";
import { FaArrowLeftLong } from "react-icons/fa6";

const UserCV = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = getFromLocalStorage("user");

  const [dataCV, setDataCV] = useState({
    description: "",
    userCvData: {
      firstName: "",
      lastName: "",
    },
    file: "",
  });
  const [loading, setLoading] = useState(true); // Thêm state loading

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (id) {
      const fetchCV = async () => {
        try {
          const res = await getDetailCvService(id, user.roleCode);
          if (res && res.result && res.result.data) {
            setDataCV(res.result.data); // Sử dụng res.result.data thay vì res.data
          } else {
            console.error("No valid data returned from API");
            navigate("/candidate/cv-post");
          }
        } catch (error) {
          console.error("Error fetching CV:", error);
          navigate("/candidate/cv-post");
        } finally {
          setLoading(false); // Đánh dấu loading hoàn tất
        }
      };
      fetchCV();
    }
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>; // Hiển thị khi đang fetch
  }

  return (
    <section className="candidate-info-area">
      <div className="container">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div
                onClick={() => navigate(-1)}
                className="mb-2 hover-pointer"
                style={{ color: "red", cursor: "pointer" }}
              >
                <FaArrowLeftLong
                  style={{ position: "relative", top: "-1px" }}
                />{" "}
                Quay lại
              </div>
              <h4 className="card-title">Giới thiệu bản thân</h4>
              <blockquote className="blockquote blockquote-primary">
                <p>{dataCV.description || "Chưa có mô tả"}</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title">
                    {dataCV.userCvData && dataCV.userCvData.firstName
                      ? `${dataCV.userCvData.firstName} ${dataCV.userCvData.lastName}`
                      : "Không xác định"}
                  </cite>
                </footer>
              </blockquote>
            </div>
            <div className="card-body">
              <h4 className="card-title">FILE CV</h4>
              {dataCV.file ? (
                <iframe width="100%" height="700px" src={dataCV.file}></iframe>
              ) : (
                <p>Không có file CV để hiển thị</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCV;
