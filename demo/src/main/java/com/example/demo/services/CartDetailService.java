package com.example.demo.services;

import com.example.demo.Repositories.CartDetailRepository;
import com.example.demo.entities.CartDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailService {
    @Autowired 
    private CartDetailRepository cartDetailRepository;

    public List<CartDetail> getAllCartDetails() {
        return cartDetailRepository.findAll();
    }

    public CartDetail getCartDetailById(Long Id) {
        return cartDetailRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy cart detail phù hợp"));
    }

    public CartDetail createCartDetail(CartDetail cartDetail) {
        return cartDetailRepository.save(cartDetail);
    }

    public CartDetail updateCartDetail(Long Id, CartDetail cartDetail) {
        CartDetail existingCartDetail = getCartDetailById(Id);
        existingCartDetail.setQuantity(cartDetail.getQuantity());
        existingCartDetail.setUnit_price(cartDetail.getUnit_price());
        existingCartDetail.setCart(cartDetail.getCart());
        existingCartDetail.setBook(cartDetail.getBook());
        return cartDetailRepository.save(existingCartDetail);
    }

    public CartDetail deleteCartDetail(Long Id) {
        CartDetail existingCartDetail = getCartDetailById(Id);
        cartDetailRepository.delete(existingCartDetail);
        return existingCartDetail;
    }
}