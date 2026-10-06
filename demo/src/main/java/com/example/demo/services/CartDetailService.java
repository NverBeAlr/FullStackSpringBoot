package com.example.demo.services;

import com.example.demo.Repositories.CartDetailRepository;
import com.example.demo.entities.CartDetail;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailService {
    private final CartDetailRepository cartDetailRepository;

    public CartDetailService(CartDetailRepository cartDetailRepository) {
        this.cartDetailRepository = cartDetailRepository;
    }

    public List<CartDetail> getAllCartDetails() {
        return cartDetailRepository.findAll();
    }

    public CartDetail getCartDetailById(Long id) {
        return cartDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy cart detail phù hợp"));
    }

    public CartDetail createCartDetail(CartDetail cartDetail) {
        return cartDetailRepository.save(cartDetail);
    }

    public CartDetail updateCartDetail(Long id, CartDetail cartDetail) {
        CartDetail existing = getCartDetailById(id);
        existing.setQuantity(cartDetail.getQuantity());
        existing.setUnit_price(cartDetail.getUnit_price());
        existing.setCart(cartDetail.getCart());
        existing.setBook(cartDetail.getBook());
        return cartDetailRepository.save(existing);
    }

    public CartDetail deleteCartDetail(Long id) {
        CartDetail existing = getCartDetailById(id);
        cartDetailRepository.delete(existing);
        return existing;
    }
}