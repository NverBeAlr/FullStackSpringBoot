import React, { useState, useEffect } from 'react';
import { Pagination, Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar';
import HomeCarousel from '../components/HomeCarousel';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import { useBooks } from '../context/BooksContext';

function Home() {
  const { books } = useBooks();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const filteredBooks = books.filter((book) => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="vn-home-page min-vh-100">
      <NavigationBar />
      
      <main>
        {searchQuery === '' && (
          <section className="mb-5">
            <HomeCarousel />
          </section>
        )}
        
        <section className="py-5">
          <Container>
            <div className="mb-5">
              <h2 className="fs-2 fw-bold text-white d-flex align-items-center">
                <span className="me-3" style={{ width: '6px', height: '32px', background: '#8b5cf6' }}></span>
                {searchQuery !== '' ? `Kết quả cho: "${searchQuery}"` : "Bộ sưu tập Visual Novel"}
              </h2>
            </div>
            
            {filteredBooks.length === 0 ? (
              <div className="text-center py-5 text-light opacity-50">
                <h4 className="mb-3">Không tìm thấy tựa game nào.</h4>
              </div>
            ) : (
              // Sử dụng filteredBooks trực tiếp để hiển thị TẤT CẢ
              <Row xs={2} md={3} lg={4} className="g-4 mb-5">
                {filteredBooks.map((book) => (
                  <Col key={book.id}>
                    <BookCard book={book} />
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </section>
      </main>

      <Footer />

      <style type="text/css">{`
        .vn-home-page { 
          background-color: #0f0f12; /* Nền tối chủ đạo */
          background-image: radial-gradient(circle at 100% 0%, #1e1b4b 0%, #0f0f12 50%);
        }
        
        .vn-pagination .page-link {
          background-color: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: white !important;
        }
        
        .vn-pagination .page-item.active .page-link {
          background: linear-gradient(135deg, #8b5cf6, #c084fc) !important;
          border-color: transparent !important;
        }
      `}</style>
    </div>
  );
}

export default Home;