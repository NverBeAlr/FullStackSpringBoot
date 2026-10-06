package com.example.demo.services;

import com.example.demo.Repositories.PaymentMethodRepository;
import com.example.demo.entities.PaymentMethod;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodService {
    private final PaymentMethodRepository paymentMethodRepository;

    public PaymentMethodService(PaymentMethodRepository paymentMethodRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
    }

    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodRepository.findAll();
    }

    public PaymentMethod getPaymentMethodById(Long id) {
        return paymentMethodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy payment method phù hợp"));
    }

    public PaymentMethod createPaymentMethod(PaymentMethod paymentMethod) {
        return paymentMethodRepository.save(paymentMethod);
    }

    public PaymentMethod updatePaymentMethod(Long id, PaymentMethod paymentMethod) {
        PaymentMethod existing = getPaymentMethodById(id);
        existing.setName(paymentMethod.getName());
        existing.setDescription(paymentMethod.getDescription());
        return paymentMethodRepository.save(existing);
    }

    public PaymentMethod deletePaymentMethod(Long id) {
        PaymentMethod existing = getPaymentMethodById(id);
        paymentMethodRepository.delete(existing);
        return existing;
    }
}