package com.example.demo.services;

import com.example.demo.Repositories.CartRepository;
import com.example.demo.entities.Cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
	@Autowired 
	private CartRepository cartRepository;

	public List<Cart> getAllCarts() {
		return cartRepository.findAll();
	}

	public Cart getCartById(Long Id) {
		return cartRepository.findById(Id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy cart phù hợp"));
	}

	public Cart createCart(Cart cart) {
		return cartRepository.save(cart);
	}

	public Cart updateCart(Long Id, Cart cart) {
		Cart existingCart = getCartById(Id);
		existingCart.setTotal_quantity(cart.getTotal_quantity());
		existingCart.setTotal_price(cart.getTotal_price());
		existingCart.setCustomer(cart.getCustomer());
		return cartRepository.save(existingCart);
	}

	public Cart deleteCart(Long Id) {
		Cart existingCart = getCartById(Id);
		cartRepository.delete(existingCart);
		return existingCart;
}
}
