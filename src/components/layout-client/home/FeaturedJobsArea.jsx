import React, { useEffect, useState } from "react";
import { getListPostService } from "../../../services/userService";
import JobsList from "./JobsList";
import LoadingPage from "../../../pages/loading-page/LoadingPage";

const FeaturedJobArea = () => {
  const [dataFeature, setDataFeature] = useState([]);
  const [dataHot, setDataHot] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPost = async (limit, offset) => {
    setLoading(true);
    setError(null);
    try {
      const [arrData, arrData2] = await Promise.all([
        getListPostService({
          limit,
          offset,
          categoryJobCode: "",
          addressCode: "",
          salaryJobCode: "",
          categoryJoblevelCode: "",
          categoryWorktypeCode: "",
          experienceJobCode: "",
          sortName: false,
        }),
        getListPostService({
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
        }),
      ]);

      setDataFeature(arrData.data.rows);
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
      <section
        className="featured-job-area"
        style={{ padding: "4rem 0", position: "relative" }}
      >
        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <LoadingPage />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div style={{ border: "1px solid #ccc" }} className="container">
          <div style={{ background: "#f5f5f5" }} className="row">
            <div style={{ height: "66px" }} className="col-lg-12">
              <div className="section-tittle text-left">
                {/* <span>CÁC CÔNG VIỆC ĐANG CHỜ BẠN</span> */}
                <h2 style={{ lineHeight: "66px" }}>CÔNG VIỆC NỔI BẬT</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-12" style={{ marginTop: "1rem" }}>
              <JobsList dataFeature={dataHot} loading={loading} />
            </div>
          </div>
        </div>

        <div
          style={{ border: "1px solid #ccc", marginTop: "3rem" }}
          className="container"
        >
          <div style={{ background: "#f5f5f5" }} className="row">
            <div style={{ height: "66px" }} className="col-lg-12">
              <div className="section-tittle text-left">
                {/* <span>CÁC CÔNG VIỆC ĐANG CHỜ BẠN</span> */}
                <h2 style={{ lineHeight: "66px" }}>CÔNG VIỆC MỚI ĐĂNG</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div style={{ marginTop: "1rem" }} className="col-xl-12">
              <JobsList dataFeature={dataFeature} loading={loading} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedJobArea;
