import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // 1. Import thẻ Link từ react-router-dom
import BookCard from './BookCard'; 

function BookSection({ title, books }) {
  return (
    <section className="py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-end mb-4">
          <h2 className="fs-3 fw-bold border-start border-4 border-primary ps-3 m-0">
            {title}
          </h2>
          
          {/* 2. Thay thẻ <a> bằng thẻ <Link> và trỏ đến đường dẫn /books */}
          <Link to="/books" className="text-decoration-none text-primary fw-medium d-flex align-items-center">
            Xem tất cả <ChevronRight size={16} />
          </Link>
          
        </div>
        <Row xs={2} md={3} lg={4} className="g-4">
          {books.map((book) => (
            <Col key={book.id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default BookSection;