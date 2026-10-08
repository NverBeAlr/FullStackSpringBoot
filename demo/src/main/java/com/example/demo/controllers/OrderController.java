package com.example.demo.controllers;

import com.example.demo.services.OrderService;
import com.example.demo.entities.Orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired 
    private OrderService orderService;

    @GetMapping
    public List<Orders> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{Id}")
    public Orders getOrderById(@PathVariable Long Id) {
        return orderService.getOrderById(Id);
    }

    @PostMapping("/create")
    public String createOrder(@RequestBody Orders order) {
        orderService.createOrder(order);
        return "Thêm thành công";
    }

    @PutMapping("/{Id}")
    public String updateOrder(@PathVariable Long Id, @RequestBody Orders order) {
        orderService.updateOrder(Id, order);
        return "Sửa thành công";
    }

    @DeleteMapping("/{Id}")
    public String deleteOrder(@PathVariable Long Id) {
        orderService.deleteOrder(Id);
        return "Xóa thành công";
    }
}