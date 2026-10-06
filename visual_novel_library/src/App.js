import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import các trang của Khách hàng
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; 
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Wishlist from './pages/Wishlist';

// Import Context
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { BooksProvider } from './context/BooksContext'; 
import { OrderProvider } from './context/OrderContext'; // <-- THÊM ORDER PROVIDER Ở ĐÂY

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BooksProvider>
            <OrderProvider> {/* <-- BỌC TOÀN BỘ APP TRONG ORDER PROVIDER */}
              <BrowserRouter>
                <Routes>
                  {/* LUỒNG KHÁCH HÀNG (Client) */}
                  <Route path="/" element={<Home />} />
                  <Route path="/books" element={<AllBooks />} /> 
                  <Route path="/book/:id" element={<BookDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/wishlist" element={<Wishlist />} />

                </Routes>
              </BrowserRouter>
            </OrderProvider>
          </BooksProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;