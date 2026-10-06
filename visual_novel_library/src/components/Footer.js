import React from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h3 className="fw-bold text-primary mb-3">Visual Novel Library</h3>
            <p className="text-secondary small">
              Thư viện truyện tranh tương tác hàng đầu.
            </p>
          </Col>
          <Col md={4}>
            <h5 className="fw-semibold mb-3">Hỗ trợ khách hàng</h5>
            <ul className="list-unstyled text-secondary small line-height-lg">
              <li className="mb-2"><a href="#1" className="text-decoration-none text-secondary custom-hover">Chính sách đổi trả</a></li>
              <li className="mb-2"><a href="#2" className="text-decoration-none text-secondary custom-hover">Phương thức thanh toán</a></li>
              <li className="mb-2"><a href="#3" className="text-decoration-none text-secondary custom-hover">Phí vận chuyển</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="fw-semibold mb-3">Đăng ký nhận tin</h5>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Email của bạn..."
                aria-label="Email"
                className="rounded-start shadow-none"
              />
              <Button variant="primary" className="rounded-end shadow-none">
                Gửi
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;