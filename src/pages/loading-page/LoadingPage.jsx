import "./loadingpage.css";

const LoadingPage = () => {
  return (
    <>
      <div className="loading-page-container">
        <div className="scene">
          <div className="shadow" />
          <div className="jumper">
            <div className="spinner">
              <div className="scaler">
                <div className="loader">
                  <div className="cuboid">
                    <div className="cuboid__side" />
                    <div className="cuboid__side" />
                    <div className="cuboid__side" />
                    <div className="cuboid__side" />
                    <div className="cuboid__side" />
                    <div className="cuboid__side" />
                  </div>
                </div>
                <h1 style={{ color: "#1098ad" }}>Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
