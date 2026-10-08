package com.example.demo.controllers;

import com.example.demo.services.CustomerService;
import com.example.demo.entities.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired 
    private CustomerService customerService;

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{Id}")
    public Customer getCustomerById(@PathVariable Long Id) {
        return customerService.getCustomerById(Id);
    }

    @PostMapping("/create")
    public String createCustomer(@RequestBody Customer customer) {
        customerService.createCustomer(customer);
        return "Thêm thành công";
    }

    @PutMapping("/{Id}")
    public String updateCustomer(@PathVariable Long Id, @RequestBody Customer customer) {
        customerService.updateCustomer(Id, customer);
        return "Sửa thành công";
    }

    @DeleteMapping("/{Id}")
    public String deleteCustomer(@PathVariable Long Id) {
        customerService.deleteCustomer(Id);
        return "Xóa thành công";
    }
}