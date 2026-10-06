package com.example.demo.services;

import com.example.demo.Repositories.CartRepository;
import com.example.demo.entities.Cart;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
	private final CartRepository cartRepository;

	public CartService(CartRepository cartRepository) {
		this.cartRepository = cartRepository;
	}

	public List<Cart> getAllCarts() {
		return cartRepository.findAll();
	}

	public Cart getCartById(Long id) {
		return cartRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy cart phù hợp"));
	}

	public Cart createCart(Cart cart) {
		return cartRepository.save(cart);
	}

	public Cart updateCart(Long id, Cart cart) {
		Cart existing = getCartById(id);
		existing.setTotal_quantity(cart.getTotal_quantity());
		existing.setTotal_price(cart.getTotal_price());
		existing.setCustomer(cart.getCustomer());
		return cartRepository.save(existing);
	}

	public Cart deleteCart(Long id) {
		Cart existing = getCartById(id);
		cartRepository.delete(existing);
		return existing;
}
}
