package com.example.demo.services;

import com.example.demo.Repositories.OrderRepository;
import com.example.demo.entities.Orders;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
	private final OrderRepository orderRepository;

	public OrderService(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}

	public List<Orders> getAllOrders() {
		return orderRepository.findAll();
	}

	public Orders getOrderById(Long id) {
		return orderRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy order phù hợp"));
	}

	public Orders createOrder(Orders order) {
		return orderRepository.save(order);
	}

	public Orders updateOrder(Long id, Orders order) {
		Orders existing = getOrderById(id);
		existing.setOrder_date(order.getOrder_date());
		existing.setTotal_quantity(order.getTotal_quantity());
		existing.setTotal_price(order.getTotal_price());
		existing.setAddress(order.getAddress());
		existing.setStatus(order.getStatus());
		existing.setCustomer(order.getCustomer());
		existing.setPaymentMethod(order.getPaymentMethod());
		return orderRepository.save(existing);
	}

	public Orders deleteOrder(Long id) {
		Orders existing = getOrderById(id);
		orderRepository.delete(existing);
		return existing;
}
}
