import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ChevronRight } from 'lucide-react';

// LƯU Ý: Bạn hãy tìm một tấm ảnh NGANG (landscape) mang phong cách anime/game 
// lưu vào thư mục image và đổi tên file tương ứng ở đây nhé!

function HeroBanner() {
  return (
    <div className="hero-banner-container py-5">
      <Container>
        <Row className="align-items-center min-vh-50 py-5">
          {/* Cột chứa chữ */}
          <Col md={6} className="mb-4 mb-md-0">
            <h1 className="display-4 fw-bolder text-white mb-4 hero-title">
              Lựa Chọn Số Phận, <br />
              <span className="text-highlight">Viết Nên Câu Chuyện</span>
            </h1>
            <p className="lead text-light mb-4 opacity-75">
              Đắm chìm vào kho tàng Visual Novel khổng lồ. Nơi mỗi quyết định của bạn đều dẫn đến những ngã rẽ và kết cục hoàn toàn khác biệt.
            </p>
            <Button className="hero-btn rounded-pill px-4 py-2 d-flex align-items-center gap-2">
              Khám phá ngay <ChevronRight size={20} />
            </Button>
          </Col>

          {/* Cột chứa ảnh */}
          <Col md={6} className="text-center">
            <div className="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=1200"
                alt="Visual Novel Banner"
                className="img-fluid rounded-4 shadow-lg hero-img"
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* CSS dành riêng cho HeroBanner */}
      <style>{`
        .hero-banner-container {
          background-color: #0f0f12; /* Nền tối đồng bộ với Navbar */
          background-image: radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
          overflow: hidden;
        }
        
        .hero-title {
          line-height: 1.3;
        }
        
        .text-highlight {
          background: linear-gradient(45deg, #c084fc, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero-btn {
          background: linear-gradient(135deg, #8b5cf6, #c084fc);
          border: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .hero-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
        }
        
        /* Hiệu ứng 3D cho ảnh Banner */
        .hero-img {
          transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);
          transition: all 0.5s ease;
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .hero-img:hover {
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
          box-shadow: 0 15px 40px rgba(139, 92, 246, 0.3) !important;
        }
      `}</style>
    </div>
  );
}

export default HeroBanner;