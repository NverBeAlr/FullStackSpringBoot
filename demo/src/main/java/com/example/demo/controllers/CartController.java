package com.example.demo.controllers;

import com.example.demo.services.CartService;
import com.example.demo.entities.Cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {
    @Autowired 
    private CartService cartService;

    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    @GetMapping("/{Id}")
    public Cart getCartById(@PathVariable Long Id) {
        return cartService.getCartById(Id);
    }

    @PostMapping("/create")
    public String createCart(@RequestBody Cart cart) {
        cartService.createCart(cart);
        return "Thêm thành công";
    }

    @PutMapping("/{Id}")
    public String updateCart(@PathVariable Long Id, @RequestBody Cart cart) {
        cartService.updateCart(Id, cart);
        return "Sửa thành công";
    }

    @DeleteMapping("/{Id}")
    public String deleteCart(@PathVariable Long Id) {
        cartService.deleteCart(Id);
        return "Xóa thành công";
    }
}