import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { Trash2, Eye, ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useWishlist } from '../context/WishlistContext';

function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();

  // Logic phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Số sản phẩm hiển thị mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlist.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NavigationBar />
      
      <Container className="py-5 flex-grow-1">
        {/* Nút quay lại và Tiêu đề */}
        <div className="d-flex align-items-center mb-4 gap-3">
          <Button variant="link" className="text-dark p-0" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </Button>
          <h2 className="fw-bold m-0">Sản phẩm yêu thích ({wishlist.length})</h2>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm">
            <Heart size={64} className="text-muted mb-3" />
            <h5>Danh sách yêu thích đang trống</h5>
            <p className="text-muted">Hãy khám phá thêm các cuốn sách hay và "thả tim" nhé!</p>
            <Button variant="primary" onClick={() => navigate('/books')} className="rounded-pill px-4">
              Khám phá sách
            </Button>
          </div>
        ) : (
          <>
            <Row className="g-4">
              {currentItems.map((book) => (
                <Col key={book.id} md={6} lg={3}>
                  <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                    <Card.Img variant="top" src={book.img} style={{ height: '280px', objectFit: 'cover' }} />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold text-dark">{book.title}</Card.Title>
                      <div className="text-danger fw-bold mb-3">{book.price}</div>
                      
                      {/* Nút hành động */}
                      <div className="mt-auto d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          className="flex-grow-1 rounded-pill d-flex align-items-center justify-content-center gap-2"
                          onClick={() => navigate(`/book/${book.id}`)}
                        >
                          <Eye size={18} /> Chi tiết
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          className="rounded-circle"
                          onClick={() => toggleWishlist(book)}
                          title="Xóa khỏi yêu thích"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination>
                  <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                  {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item 
                      key={i + 1} 
                      active={i + 1 === currentPage} 
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default Wishlist;