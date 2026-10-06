import React, { createContext, useState, useContext, useEffect } from 'react';
import { booksData } from '../data/booksData';

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('vn_library_inventory');
    const savedData = saved ? JSON.parse(saved) : [];
    
    // Tự động thêm sách mới từ file data vào danh sách đã lưu nếu chưa có
    const mergedBooks = [...savedData];
    booksData.forEach(newBook => {
      if (!mergedBooks.find(b => b.id === newBook.id)) {
        mergedBooks.push(newBook);
      }
    });
    return mergedBooks;
  });

  useEffect(() => {
    localStorage.setItem('vn_library_inventory', JSON.stringify(books));
  }, [books]);

  return (
    <BooksContext.Provider value={{ books }}>
      {children}
    </BooksContext.Provider>
  );
}

export const useBooks = () => useContext(BooksContext);