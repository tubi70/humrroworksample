package com.humrro.controller;

import com.humrro.model.User;
import com.humrro.repository.UserRepository;
import com.humrro.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> creds) {
        User user = userRepository.findByUsername(creds.get("username")).orElseThrow();
        if (passwordEncoder.matches(creds.get("password"), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
            return Map.of("token", token, "role", user.getRole());
        }
        throw new RuntimeException("Invalid credentials");
    }
}
