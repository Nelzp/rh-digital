package com.gestaodigital.rh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gestaodigital.rh.entity.Usuario;
import com.gestaodigital.rh.repository.UsuarioRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository repo;
    private final PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String email) {
        Usuario u = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return User.builder()
                .username(u.getEmail())
                .password(u.getSenha())
                .roles(u.getRole().name())
                .build();
    }

    public Usuario criar(Usuario u){
        u.setSenha(encoder.encode(u.getSenha())); // 🔐 criptografia
        return repo.save(u);
    }

    public List<Usuario> listar(){
        return repo.findAll();
    }

    public Usuario buscar(Long id){
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public void deletar(Long id){
        repo.deleteById(id);
    }
}
