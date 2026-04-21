package com.gestaodigital.rh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;
import com.gestaodigital.rh.security.JwtUtil;
import com.gestaodigital.rh.dto.LoginRequest;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager manager;
    private final JwtUtil jwt;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest req) {
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email(), req.senha()));
        return jwt.generateToken(req.email());
    }
}
