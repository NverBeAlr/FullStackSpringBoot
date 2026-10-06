import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email); 
    navigate('/');
  };

  return (
    <div className="vn-login-page min-vh-100 d-flex flex-column">
      <NavigationBar />
      
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <Card className="vn-glass-card border-0 rounded-4 p-4 p-md-5" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold text-white mb-2">Đăng Nhập</h2>
            <p className="text-white opacity-50">Chào mừng trở lại thư viện</p>
          </div>

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <div className="position-relative">
                <Mail className="position-absolute top-50 translate-middle-y ms-3 text-highlight" size={18} />
                <Form.Control 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="vn-input ps-5 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="position-relative">
                <Lock className="position-absolute top-50 translate-middle-y ms-3 text-highlight" size={18} />
                <Form.Control 
                  type="password" 
                  placeholder="Mật khẩu" 
                  className="vn-input ps-5 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Button type="submit" className="vn-login-btn w-100 py-2 fw-bold rounded-pill mb-3 d-flex align-items-center justify-content-center gap-2">
              <LogIn size={18} /> Đăng Nhập
            </Button>
          </Form>

          <div className="text-center text-white opacity-75 mt-3 small">
            Chưa có tài khoản? <Link to="/register" className="text-highlight fw-medium text-decoration-none">Đăng ký ngay</Link>
          </div>
        </Card>
      </Container>

      <Footer />

      <style>{`
        .vn-login-page { 
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
        .vn-login-btn { 
          background: linear-gradient(135deg, #8b5cf6, #c084fc); 
          border: none; 
        }
        .vn-login-btn:hover { filter: brightness(1.1); }
      `}</style>
    </div>
  );
}

export default Login;