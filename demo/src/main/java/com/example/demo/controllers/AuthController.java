package com.example.demo.controllers;

import com.example.demo.Repositories.AdminRepository;
import com.example.demo.Utils.JwtUtil;
import com.example.demo.entities.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> accountRegister){
        //Lấy email, pwd của admin đang đăng ký
        String email = accountRegister.get("email");
        String password = accountRegister.get("password");

        if(adminRepository.findByEmail(email).isPresent()){
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        Admin newAdmin = new Admin();
        newAdmin.setEmail(email);
        newAdmin.setPassword(passwordEncoder.encode(password));
        adminRepository.save(newAdmin);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> account){
    String email = account.get("email");
    String password = account.get("password");

    Optional<Admin> optionalAdmin = adminRepository.findByEmail(email);
    if(optionalAdmin.isPresent() && passwordEncoder.matches(password, optionalAdmin.get().getPassword())){
        String token = jwtUtil.generateToken(email);

        // Map<String, String> response = new HashMap<>();
        // response.put("message", "Đăng nhập thành công");
        // response.put("token", token);

        // return ResponseEntity.ok(response);
        return ResponseEntity.ok(Map.of(
            "message", "Đăng nhập thành công",
            "token", token
        ));
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tài khoản sai");
}

    @GetMapping("/personal")
    public ResponseEntity<?> getCurrentAdmin(@RequestHeader(value = "Authorization", required = false) String authHeader){
        //Kiểm tra header authorization tồn tại không
        if(authHeader == null || authHeader.startsWith("Bearer ")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Lỗi token");
        }

        String token = authHeader.substring(7);

        //Xác thực token
        if(jwtUtil.validateToken(token)){
            String email = jwtUtil.extractEmail(token);
            return ResponseEntity.ok("Xác thực thành công");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Xác thực thất bại");
    }
}