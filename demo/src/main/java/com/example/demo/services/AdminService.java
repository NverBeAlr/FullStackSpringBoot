package com.example.demo.services;

import com.example.demo.Repositories.AdminRepository;
import com.example.demo.entities.Admin;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
	private final AdminRepository adminRepository;

	public AdminService(AdminRepository adminRepository) {
		this.adminRepository = adminRepository;
	}

	public List<Admin> getAllAdmins() {
		return adminRepository.findAll();
	}

	public Admin getAdminById(Long id) {
		return adminRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy admin phù hợp"));
	}

	public Admin createAdmin(Admin admin) {
		return adminRepository.save(admin);
	}

	public Admin updateAdmin(Long id, Admin admin) {
		Admin existing = getAdminById(id);
		existing.setName(admin.getName());
		existing.setEmail(admin.getEmail());
		existing.setPassword(admin.getPassword());
		existing.setRole(admin.getRole());
		existing.setPhone_number(admin.getPhone_number());
		return adminRepository.save(existing);
	}

	public Admin deleteAdmin(Long id) {
		Admin existing = getAdminById(id);
		adminRepository.delete(existing);
		return existing;
	}
}
