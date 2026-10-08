package com.example.demo.services;

import com.example.demo.Repositories.OrderDetailRepository;
import com.example.demo.entities.OrderDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService {
    @Autowired 
    private OrderDetailRepository orderDetailRepository;

    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    public OrderDetail getOrderDetailById(Long Id) {
        return orderDetailRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy order detail phù hợp"));
    }

    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    public OrderDetail updateOrderDetail(Long Id, OrderDetail orderDetail) {
        OrderDetail existingOrderDetail = getOrderDetailById(Id);
        existingOrderDetail.setQuantity(orderDetail.getQuantity());
        existingOrderDetail.setUnit_price(orderDetail.getUnit_price());
        existingOrderDetail.setOrder(orderDetail.getOrder());
        existingOrderDetail.setBook(orderDetail.getBook());
        return orderDetailRepository.save(existingOrderDetail);
    }

    public OrderDetail deleteOrderDetail(Long Id) {
        OrderDetail existingOrderDetail = getOrderDetailById(Id);
        orderDetailRepository.delete(existingOrderDetail);
        return existingOrderDetail;
    }
}