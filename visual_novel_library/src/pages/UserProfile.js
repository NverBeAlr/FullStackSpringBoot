import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Table } from 'react-bootstrap';
import { User, Mail, Phone, MapPin, Edit, Save, ShoppingBag } from 'lucide-react';
import { Navigate } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

function UserProfile() {
  const { user, updateUser, isAuthenticated } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Khách hàng',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!isAuthenticated) return <Navigate to="/login" />;

  const myOrders = orders.filter(order => order.customerEmail === user.email);

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="vn-profile-page min-vh-100 d-flex flex-column text-white">
      <NavigationBar />
      <Container className="py-5 flex-grow-1">
        <h2 className="fw-bold mb-4">Hồ sơ cá nhân</h2>
        
        <Row className="gy-4 mb-5">
          <Col lg={4}>
            <Card className="vn-glass-card border-0 rounded-4 text-center p-4 h-100">
              <div className="avatar-circle mx-auto mb-3">{formData.name.charAt(0).toUpperCase()}</div>
              <h4 className="fw-bold">{formData.name}</h4>
              <p className="opacity-50">Thành viên Visual Novel Hub</p>
              <Badge bg="transparent" className="border border-highlight text-highlight px-3 py-2 rounded-pill">Đang hoạt động</Badge>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="vn-glass-card border-0 rounded-4 p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0"><User className="text-highlight me-2" size={20} /> Thông tin cá nhân</h5>
                <Button variant="outline-light" size="sm" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                  {isEditing ? <Save size={16} /> : <Edit size={16} />} {isEditing ? 'Lưu' : 'Sửa'}
                </Button>
              </div>
              <Row className="g-3">
                <Col md={6}><Form.Label className="small opacity-50">Họ và tên</Form.Label><Form.Control className="vn-input" readOnly={!isEditing} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></Col>
                <Col md={6}><Form.Label className="small opacity-50">Email</Form.Label><Form.Control className="vn-input" readOnly value={formData.email} /></Col>
                <Col md={6}><Form.Label className="small opacity-50">Số điện thoại</Form.Label><Form.Control className="vn-input" readOnly={!isEditing} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></Col>
                <Col md={12}><Form.Label className="small opacity-50">Địa chỉ</Form.Label><Form.Control as="textarea" className="vn-input" readOnly={!isEditing} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} /></Col>
              </Row>
            </Card>
          </Col>
        </Row>
        
      </Container>
      <Footer />

      <style>{`
        .vn-profile-page { background-color: #0f0f12; color: white; } /* Set màu chữ mặc định cho toàn trang */
        .vn-glass-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); }
        
        /* Cải thiện Input */
        .vn-input { 
          background: rgba(0,0,0,0.4) !important; 
          border: 1px solid rgba(255,255,255,0.2) !important; 
          color: white !important; 
        }
        .vn-input:focus {
          background: rgba(0,0,0,0.5) !important;
          border-color: #8b5cf6 !important;
          box-shadow: none;
        }
        
        /* Đảm bảo Label trong form dễ đọc */
        .form-label { color: rgba(255, 255, 255, 0.7) !important; }
        
        .avatar-circle { width: 80px; height: 80px; background: #8b5cf6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; }
        .text-highlight { color: #8b5cf6; }
        .border-highlight { border-color: #8b5cf6 !important; }
        .vn-input {
          background: rgba(0,0,0,0.4) !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
          color: white !important;
        }

        .vn-input::placeholder {
          color: rgba(255,255,255,0.5) !important;
        }

        .vn-input:read-only {
          color: white !important;
        }
        
      `}</style>
    </div>
  );
}

export default UserProfile;