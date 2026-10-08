package com.example.demo.services;

import com.example.demo.Repositories.AdminRepository;
import com.example.demo.entities.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
	@Autowired 
	private AdminRepository adminRepository;

	public List<Admin> getAllAdmins() {
		return adminRepository.findAll();
	}

	public Admin getAdminById(Long Id) {
		return adminRepository.findById(Id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy admin phù hợp"));
	}

	public Admin createAdmin(Admin admin) {
		return adminRepository.save(admin);
	}

	public Admin updateAdmin(Long Id, Admin admin) {
		Admin existingAdmin = getAdminById(Id);
		existingAdmin.setName(admin.getName());
		existingAdmin.setEmail(admin.getEmail());
		existingAdmin.setPassword(admin.getPassword());
		existingAdmin.setRole(admin.getRole());
		existingAdmin.setPhone_number(admin.getPhone_number());
		return adminRepository.save(existingAdmin);
	}

	public Admin deleteAdmin(Long Id) {
		Admin existingAdmin = getAdminById(Id);
		adminRepository.delete(existingAdmin);
		return existingAdmin;
	}
}
