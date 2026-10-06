package com.example.demo.entities;

import java.util.ArrayList;
import java.util.*;

import jakarta.persistence.*;


@Entity
@Table(name = "carts")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column 
    private Integer Total_quantity;

    @Column(columnDefinition = "DECIMAL(10, 2) CHECK (Total_price >= 0)")
    private Double Total_price;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn (name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartDetail> cartDetails = new ArrayList<>();

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Integer getTotal_quantity() {
        return Total_quantity;
    }

    public void setTotal_quantity(Integer total_quantity) {
        Total_quantity = total_quantity;
    }

    public Double getTotal_price() {
        return Total_price;
    }

    public void setTotal_price(Double total_price) {
        Total_price = total_price;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<CartDetail> getCartDetails() {
        return cartDetails;
    }

    public void setCartDetails(List<CartDetail> cartDetails) {
        this.cartDetails = cartDetails;
    }
}
