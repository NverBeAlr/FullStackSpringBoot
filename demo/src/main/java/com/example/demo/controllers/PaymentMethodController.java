package com.example.demo.controllers;

import com.example.demo.services.PaymentMethodService;
import com.example.demo.entities.PaymentMethod;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment-methods")
public class PaymentMethodController {
    @Autowired 
    private PaymentMethodService paymentMethodService;

    @GetMapping
    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodService.getAllPaymentMethods();
    }

    @GetMapping("/{Id}")
    public PaymentMethod getPaymentMethodById(@PathVariable Long Id) {
        return paymentMethodService.getPaymentMethodById(Id);
    }

    @PostMapping("/create")
    public String createPaymentMethod(@RequestBody PaymentMethod paymentMethod) {
        paymentMethodService.createPaymentMethod(paymentMethod);
        return "Thêm thành công";
    }

    @PutMapping("/{Id}")
    public String updatePaymentMethod(@PathVariable Long Id, @RequestBody PaymentMethod paymentMethod) {
        paymentMethodService.updatePaymentMethod(Id, paymentMethod);
        return "Sửa thành công";
    }

    @DeleteMapping("/{Id}")
    public String deletePaymentMethod(@PathVariable Long Id) {
        paymentMethodService.deletePaymentMethod(Id);
        return "Xóa thành công";
    }
}