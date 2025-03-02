import React from "react";
import Slider from "react-slick"; // Import thư viện react-slick
import "slick-carousel/slick/slick.css"; // Import CSS cần thiết cho slider
import "slick-carousel/slick/slick-theme.css"; // Import theme CSS cho slider

const testimonials = [
  {
    name: "Margaret Lawson",
    role: "Creative Director",
    image: "/assets/img/testmonial/testimonial-founder.png",
    text: "I am at an age where I just want to be fit and healthy. Our bodies are our responsibility! So start caring for your body and it will care for you. Eat clean and workout hard.",
  },
  {
    name: "John Doe",
    role: "Software Engineer",
    image: "/assets/img/testmonial/testimonial-founder.png",
    text: "Working in the IT industry, maintaining a work-life balance is hard, but fitness is a must. It keeps me productive and focused every day.",
  },
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    image: "/assets/img/testmonial/testimonial-founder.png",
    text: "A healthy mind and body bring success in both professional and personal life. Exercise and good nutrition are my daily priorities!",
  },
];

const TestimonialAbout = () => {
  // Cấu hình cho slider
  const settings = {
    dots: true, // Hiển thị dấu chấm điều hướng
    infinite: true, // Lặp lại vô hạn
    speed: 500, // Thời gian chuyển đổi slide (ms)
    slidesToShow: 1, // Hiển thị 1 slide mỗi lần
    slidesToScroll: 1, // Cuộn từng slide
    autoplay: true, // Tự động chạy slider
    autoplaySpeed: 3000, // Thời gian giữa mỗi lần chuyển slide (ms)
  };

  return (
    <div className="testimonial-area testimonial-padding">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-8 col-lg-8 col-md-10">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="single-testimonial text-center">
                  <div className="testimonial-caption">
                    <div className="testimonial-founder">
                      <div className="founder-img mb-30">
                        <img src={testimonial.image} alt={testimonial.name} />
                        <span>{testimonial.name}</span>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="testimonial-top-cap">
                      <p>{testimonial.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialAbout;
