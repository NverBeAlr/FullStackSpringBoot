package com.example.demo.services;

import com.example.demo.Repositories.OrderDetailRepository;
import com.example.demo.entities.OrderDetail;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;

    public OrderDetailService(OrderDetailRepository orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }

    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    public OrderDetail getOrderDetailById(Long id) {
        return orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy order detail phù hợp"));
    }

    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    public OrderDetail updateOrderDetail(Long id, OrderDetail orderDetail) {
        OrderDetail existing = getOrderDetailById(id);
        existing.setQuantity(orderDetail.getQuantity());
        existing.setUnit_price(orderDetail.getUnit_price());
        existing.setOrder(orderDetail.getOrder());
        existing.setBook(orderDetail.getBook());
        return orderDetailRepository.save(existing);
    }

    public OrderDetail deleteOrderDetail(Long id) {
        OrderDetail existing = getOrderDetailById(id);
        orderDetailRepository.delete(existing);
        return existing;
    }
}