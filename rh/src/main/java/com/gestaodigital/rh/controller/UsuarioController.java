package com.gestaodigital.rh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.gestaodigital.rh.entity.Usuario;
import com.gestaodigital.rh.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioRepository repo;
    private final PasswordEncoder encoder;

    @PostMapping
    public Usuario criar(@RequestBody Usuario u){
        u.setSenha(encoder.encode(u.getSenha()));
        return repo.save(u);
    }

    @GetMapping
    public List<Usuario> listar(){
        return repo.findAll();
    }
}
