package com.example.demo.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    //id, name, price, quantity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String Name;

    @Column
    private Integer ISBN;

    @Column(columnDefinition = "DOUBLE CHECK(price > 0)")
    private Double Price;

    @Column(columnDefinition = "INT CHECK(quantity > 0)")
    private Integer Quantity;

    @Column
    private String Status;

    @Column
    private LocalDateTime year_of_publication;

    @Column(columnDefinition = "TEXT")
    private String Description;

    //Nhiều book thuộc về 1 category
    @ManyToOne(fetch = FetchType.LAZY)
    //Cột FK
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public Integer getISBN() {
        return ISBN;
    }

    public void setISBN(Integer iSBN) {
        ISBN = iSBN;
    }

    public Double getPrice() {
        return Price;
    }

    public void setPrice(Double price) {
        Price = price;
    }

    public Integer getQuantity() {
        return Quantity;
    }

    public void setQuantity(Integer quantity) {
        Quantity = quantity;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public LocalDateTime getYear_of_publication() {
        return year_of_publication;
    }

    public void setYear_of_publication(LocalDateTime year_of_publication) {
        this.year_of_publication = year_of_publication;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }
}
