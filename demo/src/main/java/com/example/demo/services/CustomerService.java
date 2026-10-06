package com.example.demo.services;

import com.example.demo.Repositories.CustomerRepository;
import com.example.demo.entities.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
	private final CustomerRepository customerRepository;

	public CustomerService(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	public Customer getCustomerById(Long id) {
		return customerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy customer phù hợp"));
	}

	public Customer createCustomer(Customer customer) {
		return customerRepository.save(customer);
	}

	public Customer updateCustomer(Long id, Customer customer) {
		Customer existing = getCustomerById(id);
		existing.setName(customer.getName());
		existing.setDate_of_birth(customer.getDate_of_birth());
		existing.setEmail(customer.getEmail());
		existing.setPassword(customer.getPassword());
		existing.setAddress(customer.getAddress());
		existing.setPhone_number(customer.getPhone_number());
		return customerRepository.save(existing);
	}

	public Customer deleteCustomer(Long id) {
		Customer existing = getCustomerById(id);
		customerRepository.delete(existing);
		return existing;
}
}
