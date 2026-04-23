package com.gestaodigital.rh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

import com.gestaodigital.rh.dto.LoginRequest;
import com.gestaodigital.rh.security.JwtUtil;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.senha()
                )
        );

        return jwtUtil.generateToken(request.email());
    }
}
