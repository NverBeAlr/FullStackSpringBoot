package com.example.demo.services;

import com.example.demo.Repositories.OrderRepository;
import com.example.demo.entities.Orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
	@Autowired 
	private OrderRepository orderRepository;

	public List<Orders> getAllOrders() {
		return orderRepository.findAll();
	}

	public Orders getOrderById(Long Id) {
		return orderRepository.findById(Id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy order phù hợp"));
	}

	public Orders createOrder(Orders order) {
		return orderRepository.save(order);
	}

	public Orders updateOrder(Long Id, Orders order) {
		Orders existingOrder = getOrderById(Id);
		existingOrder.setOrder_date(order.getOrder_date());
		existingOrder.setTotal_quantity(order.getTotal_quantity());
		existingOrder.setTotal_price(order.getTotal_price());
		existingOrder.setAddress(order.getAddress());
		existingOrder.setStatus(order.getStatus());
		existingOrder.setCustomer(order.getCustomer());
		existingOrder.setPaymentMethod(order.getPaymentMethod());
		return orderRepository.save(existingOrder);
	}

	public Orders deleteOrder(Long Id) {
		Orders existingOrder = getOrderById(Id);
		orderRepository.delete(existingOrder);
		return existingOrder;
}
}
