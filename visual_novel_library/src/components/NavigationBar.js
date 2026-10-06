import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Form, Button, Badge, NavDropdown } from 'react-bootstrap';
import { Search, ShoppingCart, User, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { booksData } from '../data/booksData'; // Import dữ liệu sách để so sánh số lượng trong giỏ hàng

import { useCart } from '../context/CartContext'; 
import { useAuth } from '../context/AuthContext';

function NavigationBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 1. Lấy từ khóa từ URL (nếu có) để làm giá trị mặc định, giúp ô tìm kiếm không bị trống khi F5
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch); 
  
  const { getCartCount } = useCart(); 
  const { user, isAuthenticated, logout } = useAuth();

  // 2. Đồng bộ ô input nếu URL bị thay đổi từ bên ngoài
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    if (searchTerm.trim() !== '') {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/'); 
    }
  };

  // 3. Hàm xử lý khi bấm nút X
  const handleClearSearch = () => {
    setSearchTerm(''); // Xóa text trong state
    navigate('/'); // Chuyển hướng về trang chủ mặc định (xóa query search)
  };

  return (
    <Navbar expand="lg" sticky="top" className="shadow-sm py-3 vn-navbar">
      <Container>
        <Navbar.Brand 
          onClick={() => navigate('/')} 
          className="fw-bold fs-4 vn-brand"
          style={{ cursor: 'pointer' }}
        >
          Visual Novel Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="vn-toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* FORM TÌM KIẾM */}
          <Form className="d-flex mx-auto w-100 px-lg-5" style={{ maxWidth: '600px' }} onSubmit={handleSearchSubmit}>
            <div className="input-group position-relative">
              <Form.Control
                type="text"
                placeholder="Tìm kiếm tựa game, nhân vật..."
                className="rounded-pill rounded-end-0 border-end-0 shadow-none focus-ring focus-ring-dark pe-4 vn-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              
              {/* Nút X: Chỉ xuất hiện khi có chữ trong ô tìm kiếm */}
              {searchTerm && (
                <div 
                  className="position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center custom-clear-btn" 
                  style={{ right: '50px', zIndex: 10, cursor: 'pointer' }}
                  onClick={handleClearSearch}
                  title="Xóa tìm kiếm"
                >
                  <X size={18} />
                </div>
              )}

              <Button type="submit" className="rounded-pill rounded-start-0 border-start-0 vn-search-btn">
                <Search size={18} />
              </Button>
            </div>
          </Form>

          <Nav className="ms-auto align-items-center gap-3 mt-3 mt-lg-0">
            
            {/* KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP */}
            {isAuthenticated && user ? (
              <NavDropdown 
                title={<span>Chào, <span className="vn-highlight fw-bold">{user.name}</span></span>} 
                id="user-nav-dropdown"
                className="vn-user-dropdown px-3 rounded-pill"
                menuVariant="dark" // Đổi menu thả xuống thành màu tối
              >
                <NavDropdown.Item onClick={() => navigate('/profile')}>
                  Hồ sơ cá nhân
                </NavDropdown.Item>

                {/* THÊM MỤC YÊU THÍCH VÀO ĐÂY */}
                <NavDropdown.Item onClick={() => navigate('/wishlist')}>
                  Game yêu thích
                </NavDropdown.Item>

                <NavDropdown.Divider className="border-secondary" />
                <NavDropdown.Item onClick={() => { logout(); navigate('/'); }} className="text-danger">
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link 
                className="vn-icon-link" 
                onClick={() => navigate('/login')}
                style={{ cursor: 'pointer' }}
                title="Đăng nhập"
              >
                <User size={24} />
              </Nav.Link>
            )}

            <Nav.Link 
              className="vn-icon-link position-relative" 
              onClick={() => navigate('/cart')}
              style={{ cursor: 'pointer' }}
              title="Giỏ hàng"
            >
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-50 translate-middle mt-1 vn-badge">
                  {getCartCount()}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <style type="text/css">
          {`
            /* Nền Navbar tối màu với hiệu ứng kính (Glassmorphism) */
            .vn-navbar {
              background: rgba(15, 15, 18, 0.85) !important;
              backdrop-filter: blur(12px);
              border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }

            /* Logo chữ Gradient */
            .vn-brand {
              background: linear-gradient(45deg, #c084fc, #8b5cf6);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              transition: all 0.3s ease;
            }
            .vn-brand:hover {
              filter: brightness(1.2);
            }

            /* Ô nhập tìm kiếm */
            .vn-search-input {
              background-color: rgba(255, 255, 255, 0.05) !important;
              border: 1px solid rgba(255, 255, 255, 0.1) !important;
              color: white !important;
              transition: all 0.3s ease;
            }
            .vn-search-input::placeholder {
              color: rgba(255, 255, 255, 0.4) !important;
            }
            .vn-search-input:focus {
              background-color: rgba(255, 255, 255, 0.1) !important;
              border-color: #8b5cf6 !important;
              box-shadow: 0 0 0 0.25rem rgba(139, 92, 246, 0.25) !important;
            }

            /* Nút tìm kiếm */
            .vn-search-btn {
              background-color: rgba(255, 255, 255, 0.05) !important;
              border: 1px solid rgba(255, 255, 255, 0.1) !important;
              color: rgba(255, 255, 255, 0.7) !important;
              transition: all 0.3s ease;
            }
            .vn-search-btn:hover {
              background-color: #8b5cf6 !important;
              border-color: #8b5cf6 !important;
              color: white !important;
            }

            /* Nút xóa (X) */
            .custom-clear-btn {
              color: rgba(255, 255, 255, 0.4);
              transition: color 0.2s ease;
            }
            .custom-clear-btn:hover {
              color: #ec4899 !important; /* Đỏ hồng cho nút xóa */
            }

            /* Các icon Giỏ hàng và User */
            .vn-icon-link {
              color: rgba(255, 255, 255, 0.7) !important;
              transition: all 0.3s ease;
            }
            .vn-icon-link:hover {
              color: #c084fc !important;
              transform: translateY(-2px);
            }

            /* Nút Toggle trên Mobile */
            .vn-toggle {
              background-color: rgba(255, 255, 255, 0.1);
              border: none;
            }

            /* Chữ người dùng đăng nhập */
            .vn-user-dropdown .nav-link {
              color: rgba(255, 255, 255, 0.8) !important;
              background: rgba(255, 255, 255, 0.05);
              transition: all 0.3s ease;
            }
            .vn-user-dropdown .nav-link:hover {
              background: rgba(255, 255, 255, 0.1);
            }
            .vn-highlight {
              color: #c084fc;
            }

            /* Dấu chấm đỏ giỏ hàng */
            .vn-badge {
              background-color: #ec4899 !important; /* Màu hồng neon */
              box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
            }
          `}
        </style>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;