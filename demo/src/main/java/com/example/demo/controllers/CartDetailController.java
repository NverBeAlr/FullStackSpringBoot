package com.example.demo.controllers;

import com.example.demo.services.CartDetailService;
import com.example.demo.entities.CartDetail;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart-details")
public class CartDetailController {
    private final CartDetailService cartDetailService;

    public CartDetailController(CartDetailService cartDetailService) {
        this.cartDetailService = cartDetailService;
    }

    @GetMapping
    public List<CartDetail> getAllCartDetails() {
        return cartDetailService.getAllCartDetails();
    }

    @GetMapping("/{id}")
    public CartDetail getCartDetailById(@PathVariable Long id) {
        return cartDetailService.getCartDetailById(id);
    }

    @PostMapping("/create")
    public CartDetail createCartDetail(@RequestBody CartDetail cartDetail) {
        return cartDetailService.createCartDetail(cartDetail);
    }

    @PutMapping("/{id}")
    public CartDetail updateCartDetail(@PathVariable Long id, @RequestBody CartDetail cartDetail) {
        return cartDetailService.updateCartDetail(id, cartDetail);
    }

    @DeleteMapping("/{id}")
    public CartDetail deleteCartDetail(@PathVariable Long id) {
        return cartDetailService.deleteCartDetail(id);
    }
}