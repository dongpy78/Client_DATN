import "./loadingpage.css";

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="rocket-loader">
        <div className="rocket">
          <div className="rocket-extras"></div>
          <div className="jet">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
