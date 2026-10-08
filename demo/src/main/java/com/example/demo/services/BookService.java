package com.example.demo.services;

import com.example.demo.Repositories.BookRepository;
import com.example.demo.entities.Book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
	@Autowired 
	private BookRepository bookRepository;

	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}

	public Book getBookById(Long Id) {
		return bookRepository.findById(Id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy book phù hợp"));
	}

	public Book createBook(Book book) {
		return bookRepository.save(book);
	}

	public Book updateBook(Long Id, Book book) {
		Book existingBook = getBookById(Id);
		existingBook.setName(book.getName());
		existingBook.setISBN(book.getISBN());
		existingBook.setPrice(book.getPrice());
		existingBook.setQuantity(book.getQuantity());
		existingBook.setStatus(book.getStatus());
		existingBook.setYear_of_publication(book.getYear_of_publication());
		existingBook.setDescription(book.getDescription());
		existingBook.setCategory(book.getCategory());
		existingBook.setAuthor(book.getAuthor());
		existingBook.setPublisher(book.getPublisher());
		return bookRepository.save(existingBook);
	}

	public Book deleteBook(Long Id) {
		Book existingBook = getBookById(Id);
		bookRepository.delete(existingBook);
		return existingBook;
	}
}
