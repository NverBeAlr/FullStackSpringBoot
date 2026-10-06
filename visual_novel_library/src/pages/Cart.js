import React from 'react';
import { Container, Row, Col, Table, Button, InputGroup, Form, Card, Badge } from 'react-bootstrap';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user, isAuthenticated } = useAuth(); 

  const parsePrice = (priceString) => parseInt(priceString.replace(/\./g, '').replace('đ', ''));
  const formatPrice = (priceNumber) => new Intl.NumberFormat('vi-VN').format(priceNumber) + 'đ';
  const calculateTotal = () => formatPrice(cartItems.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0));

  const handleCheckoutClick = () => {
    if (user || isAuthenticated) navigate('/checkout');
    else { alert('Bạn cần đăng nhập để tiến hành thanh toán!'); navigate('/login'); }
  };

  if (cartItems.length === 0) {
    return (
      <div className="vn-page-bg min-vh-100 d-flex flex-column text-white" style={{ backgroundColor: '#0f0f12' }}>
        <NavigationBar />
        <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center py-5">
          {/* Đảm bảo các thành phần bên trong không có class bg-light hoặc bg-white */}
          <ShoppingBag size={80} className="mb-4 text-highlight" />
          <h2 className="fw-bold mb-3" style={{ color: 'white' }}>Thư viện giỏ hàng đang trống</h2>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => navigate('/')}
            className="rounded-pill px-5 mt-3"
          >
            Khám phá Visual Novel
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="vn-page-bg min-vh-100 d-flex flex-column text-white">
      <NavigationBar />
      <Container className="py-5 flex-grow-1">
        <h1 className="fw-bold mb-5 d-flex align-items-center">
          Giỏ Hàng <Badge bg="transparent" className="ms-3 border border-highlight text-highlight fs-6">{cartItems.length} mục</Badge>
        </h1>

        <Row className="gy-4">
          <Col lg={8}>
            <Card className="vn-glass-card border-0 rounded-4 p-3">
              <Table className="m-0 align-middle text-white" hover responsive>
                <thead>
                  <tr className="border-secondary text-uppercase small opacity-50">
                    <th className="py-3">Tựa game</th>
                    <th className="py-3">Đơn giá</th>
                    <th className="py-3 text-center">Số lượng</th>
                    <th className="py-3 text-end">Thành tiền</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-secondary">
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-3">
                          <img src={item.img} alt={item.title} className="rounded" style={{ width: '50px', height: '70px', objectFit: 'cover' }} />
                          <span className="fw-bold">{item.title}</span>
                        </div>
                      </td>
                      <td className="fw-medium">{item.price}</td>
                      <td>
                        <InputGroup size="sm" className="justify-content-center">
                          <Button variant="outline-light" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></Button>
                          <Form.Control className="text-center bg-transparent text-white border-0" value={item.quantity} style={{ maxWidth: '40px' }} readOnly />
                          <Button variant="outline-light" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></Button>
                        </InputGroup>
                      </td>
                      <td className="text-end fw-bold text-highlight">{formatPrice(parsePrice(item.price) * item.quantity)}</td>
                      <td className="text-end">
                        <Button variant="link" className="text-danger" onClick={() => removeFromCart(item.id)}><Trash2 size={18} /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="vn-glass-card border-0 rounded-4 p-4 sticky-top">
              <h5 className="fw-bold mb-4">Tóm tắt đơn hàng</h5>
              <div className="d-flex justify-content-between mb-3 opacity-75"><span>Tạm tính</span><span>{calculateTotal()}</span></div>
              <div className="d-flex justify-content-between mb-4 opacity-75"><span>Phí vận chuyển</span><span className="text-success">Miễn phí</span></div>
              <hr className="border-secondary" />
              <div className="d-flex justify-content-between mb-4"><span className="fw-bold fs-5">Tổng cộng</span><span className="fw-bold fs-4 text-highlight">{calculateTotal()}</span></div>
              <Button size="lg" className="w-100 vn-checkout-btn py-3" onClick={handleCheckoutClick}>
                Tiến Hành Thanh Toán
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />

      <style>{`
        .vn-page-bg { background-color: #0f0f12; }
        .vn-glass-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); }
        .text-highlight { color: #8b5cf6; }
        .border-highlight { border-color: #8b5cf6 !important; }
        .vn-checkout-btn { background: linear-gradient(135deg, #8b5cf6, #c084fc); border: none; font-weight: bold; }
        .vn-checkout-btn:hover { filter: brightness(1.1); }/* Ghi đè màu nền và đường viền của bảng */
        .table {
          --bs-table-bg: transparent !important;
          --bs-table-color: white !important;
          --bs-table-hover-bg: rgba(255, 255, 255, 0.05) !important;
          --bs-table-hover-color: white !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }

        /* Loại bỏ màu nền mặc định của các ô trong bảng */
        .table td, .table th {
          background-color: transparent !important;
          color: white !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }

        /* Tinh chỉnh InputGroup trong bảng */
        .input-group .btn {
          background-color: transparent !important;
          border-color: #444 !important;
          color: white !important;
        }

        .input-group .btn:hover {
          background-color: #8b5cf6 !important;
        }
      `}</style>
    </div>
  );
}

export default Cart;