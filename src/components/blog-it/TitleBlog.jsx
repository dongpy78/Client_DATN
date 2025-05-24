import "./blog.css";

const TitleBlog = ({
  parentTitle = "Techworks",
  currentTitle = "Blog IT",
  mainTitle = "Các bài viết IT",
  parentColor = "#47b2e4",
  mainTitleColor = "#37517e",
  className = "",
  style = {},
  showBreadcrumb = true,
}) => {
  return (
    <div className={`page-title ${className}`} data-aos="fade" style={style}>
      <div className="container">
        {showBreadcrumb && (
          <nav className="breadcrumbs">
            <ul style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <li style={{ color: parentColor }}>{parentTitle}</li>/{" "}
              <li className="current">{currentTitle}</li>
            </ul>
          </nav>
        )}
        <div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: mainTitleColor,
              marginTop: "0.5rem",
            }}
          >
            {mainTitle}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default TitleBlog;
