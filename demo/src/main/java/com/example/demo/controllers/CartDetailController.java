package com.example.demo.controllers;

import com.example.demo.services.CartDetailService;
import com.example.demo.entities.CartDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart-details")
public class CartDetailController {
    @Autowired 
    private CartDetailService cartDetailService;

    @GetMapping
    public List<CartDetail> getAllCartDetails() {
        return cartDetailService.getAllCartDetails();
    }

    @GetMapping("/{Id}")
    public CartDetail getCartDetailById(@PathVariable Long Id) {
        return cartDetailService.getCartDetailById(Id);
    }

    @PostMapping("/create")
    public String createCartDetail(@RequestBody CartDetail cartDetail) {
        cartDetailService.createCartDetail(cartDetail);
        return "Thêm thành công";
    }

    @PutMapping("/{Id}")
    public String updateCartDetail(@PathVariable Long Id, @RequestBody CartDetail cartDetail) {
        cartDetailService.updateCartDetail(Id, cartDetail);
        return "Sửa thành công";
    }

    @DeleteMapping("/{Id}")
    public String deleteCartDetail(@PathVariable Long Id) {
        cartDetailService.deleteCartDetail(Id);
        return "Xóa thành công";
    }
}