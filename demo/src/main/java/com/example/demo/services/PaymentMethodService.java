package com.example.demo.services;

import com.example.demo.Repositories.PaymentMethodRepository;
import com.example.demo.entities.PaymentMethod;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodService {
    @Autowired 
    private PaymentMethodRepository paymentMethodRepository;

    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodRepository.findAll();
    }

    public PaymentMethod getPaymentMethodById(Long Id) {
        return paymentMethodRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy payment method phù hợp"));
    }

    public PaymentMethod createPaymentMethod(PaymentMethod paymentMethod) {
        return paymentMethodRepository.save(paymentMethod);
    }

    public PaymentMethod updatePaymentMethod(Long Id, PaymentMethod paymentMethod) {
        PaymentMethod existingPaymentMethod = getPaymentMethodById(Id);
        existingPaymentMethod.setName(paymentMethod.getName());
        existingPaymentMethod.setDescription(paymentMethod.getDescription());
        return paymentMethodRepository.save(existingPaymentMethod);
    }

    public PaymentMethod deletePaymentMethod(Long Id) {
        PaymentMethod existingPaymentMethod = getPaymentMethodById(Id);
        paymentMethodRepository.delete(existingPaymentMethod);
        return existingPaymentMethod;
    }
}