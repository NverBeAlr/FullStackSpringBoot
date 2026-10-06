import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { useBooks } from '../context/BooksContext';

function AllBooks() {
  const { books } = useBooks();
  const [sortOrder, setSortOrder] = useState('default'); 
  const navigate = useNavigate();
  
  // Hàm xử lý giá tiền (giữ nguyên để phục vụ sắp xếp)
  const parsePrice = (priceString) => {
    return parseInt(priceString.replace(/\./g, '').replace('đ', ''));
  };

  // Tạo danh sách đã sắp xếp
  let sortedBooks = [...books];
  if (sortOrder === 'priceAsc') {
    sortedBooks.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (sortOrder === 'priceDesc') {
    sortedBooks.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }

  // KHÔNG CÒN CẦN PHÂN TRANG: hiển thị trực tiếp sortedBooks

  return (
    <div className="vn-library-page min-vh-100 d-flex flex-column">
      <NavigationBar />

      <Container className="py-5 flex-grow-1">
        <div className="mb-4">
          <Button variant="link" className="text-decoration-none text-light opacity-75 p-0 d-flex align-items-center gap-1" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} /> Quay lại
          </Button>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <h2 className="fw-bold m-0 text-white d-flex align-items-center gap-3">
            <Gamepad2 className="text-highlight" size={32} />
            Thư Viện Visual Novel
          </h2>
          
          <div className="d-flex align-items-center gap-2">
            <span className="text-light opacity-50 fw-medium text-nowrap">Sắp xếp:</span>
            <Form.Select 
              className="vn-select shadow-none"
              style={{ width: '180px' }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Mới nhất</option>
              <option value="priceAsc">Giá: Thấp đến Cao</option>
              <option value="priceDesc">Giá: Cao xuống Thấp</option>
            </Form.Select>
          </div>
        </div>

        {/* Hiển thị tất cả sách trong mảng sortedBooks */}
        <Row xs={2} md={3} lg={4} className="g-4 mb-5">
          {sortedBooks.map((book) => (
            <Col key={book.id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </Container>
      
      <Footer />

      <style>{`
        .vn-library-page { background-color: #0f0f12; color: white; }
        .text-highlight { color: #8b5cf6; }
        .vn-select {
          background-color: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}

export default AllBooks;