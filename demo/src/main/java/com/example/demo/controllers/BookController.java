package com.example.demo.controllers;

import com.example.demo.services.BookService;
import com.example.demo.entities.Book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired 
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{Id}")
    public Book getBookById(@PathVariable Long Id) {
        return bookService.getBookById(Id);
    }

    @PostMapping("/create")
    public String createBook(@RequestBody Book book) {
        bookService.createBook(book);
        return "Thêm thành công";
    }

    @PutMapping("/{Id}")
    public String updateBook(@PathVariable Long Id, @RequestBody Book book) {
        bookService.updateBook(Id, book);
        return "Sửa thành công";
    }

    @DeleteMapping("/{Id}")
    public String deleteBook(@PathVariable Long Id) {
        bookService.deleteBook(Id);
        return "Xóa thành công";
    }
}