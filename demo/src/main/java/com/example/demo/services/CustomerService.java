package com.example.demo.services;

import com.example.demo.Repositories.CustomerRepository;
import com.example.demo.entities.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
	@Autowired 
	private CustomerRepository customerRepository;

	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	public Customer getCustomerById(Long Id) {
		return customerRepository.findById(Id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy customer phù hợp"));
	}

	public Customer createCustomer(Customer customer) {
		return customerRepository.save(customer);
	}

	public Customer updateCustomer(Long Id, Customer customer) {
		Customer existingCustomer = getCustomerById(Id);
		existingCustomer.setName(customer.getName());
		existingCustomer.setDate_of_birth(customer.getDate_of_birth());
		existingCustomer.setEmail(customer.getEmail());
		existingCustomer.setPassword(customer.getPassword());
		existingCustomer.setAddress(customer.getAddress());
		existingCustomer.setPhone_number(customer.getPhone_number());
		return customerRepository.save(existingCustomer);
	}

	public Customer deleteCustomer(Long Id) {
		Customer existingCustomer = getCustomerById(Id);
		customerRepository.delete(existingCustomer);
		return existingCustomer;
}
}
