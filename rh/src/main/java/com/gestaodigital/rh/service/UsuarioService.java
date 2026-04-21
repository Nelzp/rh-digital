package com.gestaodigital.rh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import com.gestaodigital.rh.repository.UsuarioRepository;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository repo;

    public UserDetails loadUserByUsername(String email) {
        var u = repo.findByEmail(email).orElseThrow();
        return User.builder()
                .username(u.getEmail())
                .password(u.getSenha())
                .roles(u.getRole().name())
                .build();
    }
}
