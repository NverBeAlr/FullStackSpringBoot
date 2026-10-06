import React from 'react';
import { Carousel, Button, Container } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomeCarousel() {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Sống trong thế giới Visual Novel",
      subtitle: "Trải nghiệm cốt truyện lôi cuốn, đồ họa anime tuyệt đẹp và tự quyết định số phận của chính bạn.",
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1350", // Ảnh hoa anh đào/Nhật Bản (Vibe Romance/Slice of Life)
      btnText: "Khám phá ngay",
      color: "#8b5cf6" // Tím mộng mơ
    },
    {
      id: 2,
      title: "Chuyện Tình Lãng Mạn & Huyễn Hoặc",
      subtitle: "Đắm chìm vào những cung bậc cảm xúc mãnh liệt nhất. Danh sách các tựa game Romance & Fantasy hot nhất tháng.",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1349", // Ảnh fantasy/phép thuật
      btnText: "Xem danh mục",
      color: "#ec4899" // Hồng lãng mạn
    },
    {
      id: 3,
      title: "Mọi Quyết Định Đều Thay Đổi Kết Cục",
      subtitle: "Lựa chọn ngã rẽ của riêng bạn. Đối mặt với những bí ẩn kinh hoàng trong các tựa game Horror & Mystery.",
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1351", // Ảnh neon/cyberpunk tối tăm
      btnText: "Thử thách ngay",
      color: "#e11d48" // Đỏ kịch tính/Horror
    }
  ];

  return (
    <div className="home-carousel-wrapper">
      <style type="text/css">
        {`
          .home-carousel-wrapper .carousel-item {
            height: 500px;
            background-color: #0f0f12; /* Nền tối hơn cho hợp vibe game */
          }
          .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.5; /* Giảm opacity một chút để chữ nổi bật hơn trên nền ảnh game */
          }
          .carousel-caption {
            text-align: left;
            bottom: 20%;
            left: 10%;
            right: 10%;
          }
          .carousel-title {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 8px rgba(0,0,0,0.8); /* Thêm viền bóng cho chữ dễ đọc */
            animation: fadeInUp 0.8s ease;
          }
          .carousel-subtitle {
            font-size: 1.2rem;
            max-width: 600px;
            margin-bottom: 2rem;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.8);
            animation: fadeInUp 1s ease;
          }
          .carousel-btn {
            padding: 12px 35px;
            border-radius: 50px;
            font-weight: 600;
            animation: fadeInUp 1.2s ease;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .carousel-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.4) !important;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .carousel-control-prev, .carousel-control-next {
            width: 5%;
          }
          .control-icon {
            background: rgba(255,255,255,0.1);
            padding: 10px;
            border-radius: 50%;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
          }
          .control-icon:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.1); /* Phóng to nhẹ icon khi hover */
          }
        `}
      </style>

      <Carousel 
        fade 
        indicators={true} 
        prevIcon={<div className="control-icon"><ChevronLeft size={30} /></div>}
        nextIcon={<div className="control-icon"><ChevronRight size={30} /></div>}
      >
        {slides.map((slide) => (
          <Carousel.Item key={slide.id} interval={5000}>
            <img
              className="carousel-image"
              src={slide.img}
              alt={slide.title}
            />
            <Carousel.Caption>
              <Container>
                <h1 className="carousel-title">{slide.title}</h1>
                <p className="carousel-subtitle">{slide.subtitle}</p>
                <Button 
                  style={{ backgroundColor: slide.color, border: 'none' }} 
                  className="carousel-btn shadow-lg d-inline-flex align-items-center gap-2"
                  onClick={() => navigate('/books')}
                >
                  {slide.btnText} <ArrowRight size={20} />
                </Button>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeCarousel;