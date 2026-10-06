import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, CheckCircle, ArrowLeft } from 'lucide-react';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    note: ''
  });

  if (cartItems.length === 0) navigate('/cart');

  const parsePrice = (priceString) => parseInt(priceString.toString().replace(/\./g, '').replace('đ', ''));
  const formatPrice = (priceNumber) => new Intl.NumberFormat('vi-VN').format(priceNumber) + 'đ';

  const subTotal = cartItems.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);
  const shippingFee = 30000;
  const finalTotal = subTotal + shippingFee;

  const handleCheckout = (e) => {
    e.preventDefault();
    const formattedItems = cartItems.map(item => ({
      id: item.id,
      name: item.title,
      qty: item.quantity,
      basePrice: parsePrice(item.price)
    }));

    createOrder({
      customerEmail: user?.email || 'guest@email.com',
      customer: formData.name,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
      items: formattedItems,
      total: formatPrice(finalTotal)
    });

    localStorage.removeItem('cart'); // Cần đồng bộ với hàm clearCart() nếu có trong Context
    alert('🎉 Đặt hàng thành công!');
    navigate('/profile');
  };

  return (
    <div className="vn-checkout-page min-vh-100 d-flex flex-column text-white">
      <NavigationBar />
      <Container className="py-5 flex-grow-1">
        <Button variant="link" className="text-white opacity-50 text-decoration-none mb-4 d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Quay lại giỏ hàng
        </Button>

        <h2 className="fw-bold mb-5">Xác nhận thanh toán</h2>

        <Form onSubmit={handleCheckout}>
          <Row className="gy-4">
            <Col lg={7}>
              {/* Form Thông tin */}
              <Card className="vn-glass-card border-0 rounded-4 p-4 mb-4">
                <h5 className="mb-4 d-flex align-items-center gap-2"><MapPin className="text-highlight" size={20} /> Thông tin nhận hàng</h5>
                <Row className="g-3">
                  <Col md={6}><Form.Control className="bg-dark text-white border-secondary" placeholder="Họ và tên" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></Col>
                  <Col md={6}><Form.Control className="bg-dark text-white border-secondary" placeholder="Số điện thoại" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></Col>
                  <Col md={12}><Form.Control className="bg-dark text-white border-secondary" placeholder="Địa chỉ chi tiết" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} /></Col>
                  <Col md={12}><Form.Control as="textarea" className="bg-dark text-white border-secondary" placeholder="Ghi chú đơn hàng" value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} /></Col>
                </Row>
              </Card>

              {/* Vận chuyển & Thanh toán */}
              <Card className="vn-glass-card border-0 rounded-4 p-4">
                <h5 className="mb-4 d-flex align-items-center gap-2"><CreditCard className="text-highlight" size={20} /> Thanh toán & Vận chuyển</h5>
                <div className="border border-secondary rounded p-3 mb-3 bg-dark">
                  <Form.Check type="radio" label="Giao hàng tiêu chuẩn (30.000đ)" defaultChecked />
                </div>
                <div className="border border-secondary rounded p-3 bg-dark">
                  <Form.Check type="radio" label="Thanh toán khi nhận hàng (COD)" defaultChecked name="pay" className="mb-2" />
                  <Form.Check type="radio" label="Chuyển khoản ngân hàng" name="pay" />
                </div>
              </Card>
            </Col>

            <Col lg={5}>
              {/* Tóm tắt đơn hàng */}
              <Card className="vn-glass-card border-0 rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                <h5 className="mb-4">Đơn hàng của bạn</h5>
                <div className="mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="d-flex align-items-center gap-3 mb-3">
                      <img src={item.img} className="rounded" style={{ width: '50px', height: '60px', objectFit: 'cover' }} />
                      <div className="flex-grow-1">
                        <div className="fw-bold">{item.title}</div>
                        <div className="opacity-50">x{item.quantity}</div>
                      </div>
                      <div className="text-highlight fw-bold">{item.price}</div>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between mb-2 opacity-75"><span>Tạm tính</span><span>{formatPrice(subTotal)}</span></div>
                <div className="d-flex justify-content-between mb-4 opacity-75"><span>Phí vận chuyển</span><span className="text-success">30.000đ</span></div>
                <hr className="border-secondary" />
                <div className="d-flex justify-content-between mb-4 fs-4 fw-bold"><span>Tổng cộng</span><span className="text-highlight">{formatPrice(finalTotal)}</span></div>
                <Button type="submit" size="lg" className="vn-checkout-btn w-100 py-3">
                  <CheckCircle size={20} className="me-2" /> Đặt Hàng Ngay
                </Button>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
      <Footer />

      <style>{`
        .vn-checkout-page { background-color: #0f0f12; }
        .vn-glass-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); }
        .text-highlight { color: #8b5cf6; }
        .vn-checkout-btn { background: linear-gradient(135deg, #8b5cf6, #c084fc); border: none; }
        .vn-checkout-btn:hover { filter: brightness(1.1); }
        
        /* Ép màu cho các ô nhập liệu */
        .form-control {
          background-color: #1a1a1f !important; /* Màu nền ô input hơi sáng hơn nền page một chút để tạo chiều sâu */
          color: white !important;
          border-color: #444 !important;
        }

        /* Ép màu cho chữ bên trong input khi người dùng gõ */
        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }

        /* Ép màu cho label của radio/checkbox */
        .form-check-label {
          color: white !important;
        }

        /* Đảm bảo các tiêu đề trong thẻ Card cũng màu trắng */
        .card h5 {
          color: white !important;
        }
      `}</style>
    </div>
  );
}

export default Checkout;