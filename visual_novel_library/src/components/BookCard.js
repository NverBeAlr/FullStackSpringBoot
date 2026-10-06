import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function BookCard({ book }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <Card 
      className="vn-card h-100 border-0 rounded-4"
      onClick={handleCardClick}
    >
      <div className="overflow-hidden p-2">
        <div className="vn-img-wrapper rounded-3">
          <Card.Img 
            variant="top" 
            src={book.img} 
            alt={book.title} 
            className="vn-img"
          />
        </div>
      </div>
      <Card.Body className="d-flex flex-column text-white">
        <Card.Title className="fs-6 fw-bold mb-1 vn-title" title={book.title}>
          {book.title}
        </Card.Title>
        <Card.Text className="text-white opacity-50 small mb-3">
          {book.author}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fs-5 fw-bold text-highlight">{book.price}</span>
          
          <Button 
            className="vn-add-btn rounded-circle p-2"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(book, 1);
            }}
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </Card.Body>

      <style>{`
        .vn-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .vn-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.08);
          border-color: #8b5cf6;
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.2);
        }
        .vn-img {
          height: 250px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .vn-card:hover .vn-img {
          transform: scale(1.05);
        }
        .text-highlight { color: #c084fc; }
        .vn-add-btn {
          background: rgba(139, 92, 246, 0.2) !important;
          border: none !important;
          color: white !important;
          transition: all 0.3s ease;
        }
        .vn-add-btn:hover {
          background: #8b5cf6 !important;
        }
      `}</style>
    </Card>
  );
}

export default BookCard;