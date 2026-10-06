import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    navigate('/login');
  };

  return (
    <div className="vn-register-page min-vh-100 d-flex flex-column text-white">
      <NavigationBar />
      
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <Card className="vn-glass-card border-0 rounded-4 p-4 p-md-5" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Đăng Ký</h2>
            <p className="opacity-50">Tạo tài khoản mới để tham gia vào thư viện</p>
          </div>

          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <div className="position-relative">
                <User className="position-absolute top-50 translate-middle-y ms-3 text-highlight" size={18} />
                <Form.Control 
                  type="text" placeholder="Họ và tên" className="vn-input ps-5 py-2"
                  value={name} onChange={(e) => setName(e.target.value)} required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="position-relative">
                <Mail className="position-absolute top-50 translate-middle-y ms-3 text-highlight" size={18} />
                <Form.Control 
                  type="email" placeholder="Email của bạn" className="vn-input ps-5 py-2"
                  value={email} onChange={(e) => setEmail(e.target.value)} required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="position-relative">
                <Lock className="position-absolute top-50 translate-middle-y ms-3 text-highlight" size={18} />
                <Form.Control 
                  type="password" placeholder="Mật khẩu" className="vn-input ps-5 py-2"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                />
              </div>
            </Form.Group>

            <Button type="submit" className="vn-register-btn w-100 py-2 fw-bold rounded-pill mb-3 d-flex align-items-center justify-content-center gap-2">
              <UserPlus size={18} /> Đăng Ký Tài Khoản
            </Button>
          </Form>

          <div className="text-center opacity-75 mt-3 small">
            Đã có tài khoản? <Link to="/login" className="text-highlight fw-medium text-decoration-none">Đăng nhập ngay</Link>
          </div>
        </Card>
      </Container>

      <Footer />

      <style>{`
        .vn-register-page { 
          background-color: #0f0f12;
          background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f0f12 100%);
        }
        .vn-glass-card { 
          background: rgba(255, 255, 255, 0.03); 
          backdrop-filter: blur(15px); 
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .vn-input { 
          background: rgba(0,0,0,0.3) !important; 
          border: 1px solid rgba(255,255,255,0.1) !important; 
          color: white !important; 
        }
        .vn-input::placeholder { color: rgba(255,255,255,0.3); }
        .text-highlight { color: #8b5cf6; }
        .vn-register-btn { 
          background: linear-gradient(135deg, #8b5cf6, #c084fc); 
          border: none; 
        }
        .vn-register-btn:hover { filter: brightness(1.1); }
      `}</style>
    </div>
  );
}

export default Register;