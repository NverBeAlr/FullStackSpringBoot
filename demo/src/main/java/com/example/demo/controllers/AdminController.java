package com.example.demo.controllers;

import com.example.demo.services.AdminService;
import com.example.demo.entities.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
public class AdminController {
    @Autowired 
    private AdminService adminService;

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{Id}")
    public Admin getAdminById(@PathVariable Long Id) {
        return adminService.getAdminById(Id);
    }

    @PostMapping("/create")
    public String createAdmin(@RequestBody Admin admin) {
        adminService.createAdmin(admin);
        return "Thêm thành công";
    }

    @PutMapping("/{Id}")
    public String updateAdmin(@PathVariable Long Id, @RequestBody Admin admin) {
        adminService.updateAdmin(Id, admin);
        return "Sửa thành công";
    }

    @DeleteMapping("/{Id}")
    public String deleteAdmin(@PathVariable Long Id) {
        adminService.deleteAdmin(Id);
        return "Xóa thành công";
    }
}