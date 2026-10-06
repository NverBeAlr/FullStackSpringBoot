import React, { createContext, useState, useContext, useEffect } from 'react';

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  // Tải danh sách đơn hàng từ localStorage nếu có
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('bookhaven_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Tự động lưu vào localStorage mỗi khi đơn hàng thay đổi
  useEffect(() => {
    localStorage.setItem('bookhaven_orders', JSON.stringify(orders));
  }, [orders]);

  // Hàm tạo đơn hàng mới
  const createOrder = (orderData) => {
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000), // Tạo mã đơn ngẫu nhiên
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'Chờ xác nhận', // Trạng thái mặc định ban đầu
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  // Hàm cập nhật trạng thái đơn hàng (Dùng chung cho cả Admin duyệt và Khách hủy)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);