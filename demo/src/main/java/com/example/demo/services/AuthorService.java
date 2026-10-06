package com.example.demo.services;

import com.example.demo.entities.Author;
import com.example.demo.Repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    @Autowired
    public AuthorRepository authorRepository;

    // Phương thức lấy tất cả bản ghi
    public List<Author> getAllAuthor() {
        return authorRepository.findAll();
    }

    // Phương thức lấy 1 bản ghi theo id
    public Author getAuthorById(Long Id) {
        return authorRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không có author phù hợp"));
    }

    // Phương thức lưu dữ liệu
    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    // Phương thức sửa dữ liệu
    public Author updateAuthor(Long Id, Author author) {

        Author existingAuthor = this.getAuthorById(Id);

        existingAuthor.setName(author.getName());

        return authorRepository.save(existingAuthor);
    }

    // Phương thức xóa dữ liệu
    public Author deleteAuthor(Long Id) {

        Author existingAuthor = this.getAuthorById(Id);

        authorRepository.deleteById(Id);

        return existingAuthor;
    }
}