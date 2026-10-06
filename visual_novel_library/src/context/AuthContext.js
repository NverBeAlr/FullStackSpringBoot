import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 1. State người dùng hiện tại đang đăng nhập
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. State lưu trữ TẤT CẢ người dùng (Dùng cho trang Admin)
  const [allUsers, setAllUsers] = useState(() => {
    const saved = localStorage.getItem('bookhaven_users');
    return saved ? JSON.parse(saved) : []; // Mảng rỗng nếu chưa có dữ liệu
  });

  // Tự động lưu allUsers vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('bookhaven_users', JSON.stringify(allUsers));
  }, [allUsers]);

  // Tự động lưu user đang đăng nhập vào localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Hàm Đăng ký (Cập nhật allUsers)
  const register = (email, password) => {
    const newUser = { 
      email: email, 
      name: email.split('@')[0], 
      isActive: true, 
      registerDate: new Date().toLocaleDateString('vi-VN') 
    };
    
    // Thêm vào danh sách tất cả người dùng
    setAllUsers(prev => [...prev, newUser]);
    // Đăng nhập luôn sau khi đăng ký
    setUser(newUser);
  };

  const login = (email) => {
    const existingUser = allUsers.find(u => u.email === email);
    if (existingUser) {
      setUser(existingUser);
    } else {
      // Nếu chưa có trong hệ thống, coi như đăng ký mới
      register(email, "password");
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Hàm cập nhật thông tin cá nhân
  const updateUser = (updatedInfo) => {
    setUser(prev => ({ ...prev, ...updatedInfo }));
    setAllUsers(prev => prev.map(u => u.email === user.email ? { ...u, ...updatedInfo } : u));
  };

  // Hàm khóa/mở người dùng (Dành cho Admin)
  const toggleUserStatus = (email) => {
    setAllUsers(prev => prev.map(u => 
      u.email === email ? { ...u, isActive: !u.isActive } : u
    ));
    // Nếu chính user đang login bị khóa thì logout
    if (user && user.email === email) {
      setUser(prev => ({ ...prev, isActive: !prev.isActive }));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      allUsers, // Cung cấp danh sách user cho Admin
      login, 
      register, 
      logout, 
      updateUser, 
      toggleUserStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);