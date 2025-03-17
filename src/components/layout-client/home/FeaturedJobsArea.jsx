// FeaturedJobArea.jsx
import React, { useEffect, useState } from "react";
import { getListPostService } from "../../../services/userService";
import JobsList from "./JobsList";

const FeaturedJobArea = () => {
  const [dataFeature, setDataFeature] = useState([]);
  const [dataHot, setDataHot] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPost = async (limit, offset) => {
    setLoading(true);
    setError(null);
    try {
      const arrData = await getListPostService({
        limit,
        offset,
        categoryJobCode: "",
        addressCode: "",
        salaryJobCode: "",
        categoryJoblevelCode: "",
        categoryWorktypeCode: "",
        experienceJobCode: "",
        sortName: false,
      });
      const arrData2 = await getListPostService({
        limit,
        offset,
        categoryJobCode: "",
        addressCode: "",
        salaryJobCode: "",
        categoryJoblevelCode: "",
        categoryWorktypeCode: "",
        experienceJobCode: "",
        sortName: false,
        isHot: 1,
      });

      // Lấy dữ liệu từ data.rows
      setDataFeature(arrData.data.rows);
      console.log(dataFeature);
      setDataHot(arrData2.data.rows);
    } catch (error) {
      console.error("Error in loadPost:", error);
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost(5, 0);
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <section className="featured-job-area feature-padding">
        <div className="container">
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
              <JobsList dataFeature={dataHot} />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>CÁC CÔNG VIỆC ĐANG CHỜ BẠN</span>
                <h2>Công Việc Mới Đăng</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <JobsList dataFeature={dataFeature} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedJobArea;
