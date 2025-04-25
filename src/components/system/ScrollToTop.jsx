import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Thay thế ti-arrow-up bằng icon từ thư viện khác
import "./ScrollToTop.css"; // Tạo file CSS riêng
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra vị trí scroll
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      // Tương đương topDistance: 300
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Xử lý scroll mượt
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Tạo hiệu ứng mượt
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`scroll-up ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <FaArrowUp className="scroll-up-icon" />
    </div>
  );
};

export default ScrollToTop;
