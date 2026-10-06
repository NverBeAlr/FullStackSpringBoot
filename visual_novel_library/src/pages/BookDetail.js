import React, { useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, Badge } from 'react-bootstrap';
import { ShoppingCart, Heart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useBooks } from '../context/BooksContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

function BookDetail() {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { books } = useBooks();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { isAuthenticated } = useAuth();

  const currentBook = books.find((book) => book.id.toString() === id.toString());
  const isLiked = currentBook ? isWishlisted(currentBook.id) : false;

  const handleDecrease = () => { if (quantity > 1) setQuantity(quantity - 1); };
  const handleIncrease = () => { setQuantity(quantity + 1); };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      alert("Bạn cần đăng nhập để mua hàng!");
      navigate('/login');
      return;
    }
    addToCart(currentBook, quantity);
    navigate('/checkout');
  };

  if (!currentBook) return <div className="text-white text-center pt-5">Đang tải dữ liệu hoặc sách không tồn tại...</div>;

  return (
    <div className="vn-detail-page min-vh-100 d-flex flex-column">
      <NavigationBar />
      
      <Container className="py-5 flex-grow-1">
        <Button variant="link" className="text-decoration-none text-light opacity-50 p-0 mb-4 d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Quay lại thư viện
        </Button>

        <Row className="gy-5">
          <Col md={5} lg={4}>
            <div className="position-relative overflow-hidden rounded-4 shadow-lg border border-secondary border-opacity-25">
              <img src={currentBook.img} alt={currentBook.title} className="img-fluid w-100" style={{ objectFit: 'cover' }} />
            </div>
          </Col>

          <Col md={7} lg={8} className="text-white">
            <h1 className="fw-bold mb-3 display-5">{currentBook.title}</h1>
            <p className="text-highlight fs-4 mb-4">Tác giả: {currentBook.author}</p>

            <div className="d-flex align-items-center gap-3 mb-4 p-4 rounded-4 bg-dark-glass">
              <span className="fs-2 fw-bold text-white">{currentBook.price}</span>
            </div>

            <p className="opacity-75 mb-4" style={{ lineHeight: '1.8' }}>{currentBook.description}</p>

            {/* Thông số game */}
            <div className="d-flex gap-4 mb-5 opacity-75">
              <div><strong>NXB:</strong> {currentBook.publisher}</div>
              <div><strong>Số trang:</strong> {currentBook.pages} trang</div>
            </div>

            <div className="d-flex align-items-center gap-4 mb-4">
              <InputGroup style={{ width: '140px' }}>
                <Button variant="outline-light" onClick={handleDecrease}><Minus size={16} /></Button>
                <Form.Control className="text-center bg-transparent text-white border-secondary" value={quantity} readOnly />
                <Button variant="outline-light" onClick={handleIncrease}><Plus size={16} /></Button>
              </InputGroup>
            </div>

            <div className="d-flex gap-3">
              <Button size="lg" className="vn-btn-primary px-4" onClick={() => addToCart(currentBook, quantity)}>
                <ShoppingCart size={20} className="me-2" /> Thêm vào thư viện
              </Button>
              <Button size="lg" variant="outline-light" onClick={() => toggleWishlist(currentBook)}>
                <Heart size={20} fill={isLiked ? "#f43f5e" : "none"} color={isLiked ? "#f43f5e" : "white"} />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      
      <Footer />

      <style>{`
        .vn-detail-page { background-color: #0f0f12; }
        .text-highlight { color: #8b5cf6; }
        .bg-dark-glass { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); }
        .vn-btn-primary { background: linear-gradient(135deg, #8b5cf6, #c084fc); border: none; }
        .vn-btn-primary:hover { filter: brightness(1.1); }
      `}</style>
    </div>
  );
}

export default BookDetail;