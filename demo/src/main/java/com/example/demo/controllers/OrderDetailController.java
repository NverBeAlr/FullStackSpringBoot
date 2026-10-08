package com.example.demo.controllers;

import com.example.demo.services.OrderDetailService;
import com.example.demo.entities.OrderDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-details")
public class OrderDetailController {
    @Autowired 
    private OrderDetailService orderDetailService;

    @GetMapping
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }

    @GetMapping("/{Id}")
    public OrderDetail getOrderDetailById(@PathVariable Long Id) {
        return orderDetailService.getOrderDetailById(Id);
    }

    @PostMapping("/create")
    public String createOrderDetail(@RequestBody OrderDetail orderDetail) {
        orderDetailService.createOrderDetail(orderDetail);
        return "Thêm thành công";
    }

    @PutMapping("/{Id}")
    public String updateOrderDetail(@PathVariable Long Id, @RequestBody OrderDetail orderDetail) {
        orderDetailService.updateOrderDetail(Id, orderDetail);
        return "Sửa thành công";
    }

    @DeleteMapping("/{Id}")
    public String deleteOrderDetail(@PathVariable Long Id) {
        orderDetailService.deleteOrderDetail(Id);
        return "Xóa thành công";
    }
}