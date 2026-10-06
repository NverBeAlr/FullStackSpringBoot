package com.example.demo.services;

import com.example.demo.Repositories.BookRepository;
import com.example.demo.entities.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
	private final BookRepository bookRepository;

	public BookService(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}

	public Book getBookById(Long id) {
		return bookRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy book phù hợp"));
	}

	public Book createBook(Book book) {
		return bookRepository.save(book);
	}

	public Book updateBook(Long id, Book book) {
		Book existing = getBookById(id);
		existing.setName(book.getName());
		existing.setISBN(book.getISBN());
		existing.setPrice(book.getPrice());
		existing.setQuantity(book.getQuantity());
		existing.setStatus(book.getStatus());
		existing.setYear_of_publication(book.getYear_of_publication());
		existing.setDescription(book.getDescription());
		existing.setCategory(book.getCategory());
		existing.setAuthor(book.getAuthor());
		existing.setPublisher(book.getPublisher());
		return bookRepository.save(existing);
	}

	public Book deleteBook(Long id) {
		Book existing = getBookById(id);
		bookRepository.delete(existing);
		return existing;
}
}
