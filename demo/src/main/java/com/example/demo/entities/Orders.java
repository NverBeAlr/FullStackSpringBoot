package com.example.demo.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private LocalDateTime Order_date;

    @Column(columnDefinition = "INT CHECK (Total_quantity >= 0)")
    private Integer Total_quantity;

    @Column(columnDefinition = "DECIMAL(10, 2) CHECK (Total_price >= 0)")
    private Double Total_price;

    @Column
    private String Address;

    @Column
    private String Status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_method_id")
    private PaymentMethod paymentMethod;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails = new ArrayList<>();

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public LocalDateTime getOrder_date() {
        return Order_date;
    }

    public void setOrder_date(LocalDateTime order_date) {
        Order_date = order_date;
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

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
