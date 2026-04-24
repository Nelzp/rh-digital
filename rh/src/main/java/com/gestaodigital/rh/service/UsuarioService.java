package com.gestaodigital.rh.service;

import com.gestaodigital.rh.dto.UsuarioRequest;
import com.gestaodigital.rh.dto.UsuarioResponse;
import com.gestaodigital.rh.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gestaodigital.rh.entity.Usuario;
import com.gestaodigital.rh.repository.UsuarioRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repo;
    private final PasswordEncoder encoder;

    public UsuarioResponse criar(UsuarioRequest dto){

        Usuario u = new Usuario();
        u.setEmail(dto.getEmail());
        u.setSenha(encoder.encode(dto.getSenha()));
        u.setRole(Role.valueOf(dto.getRole()));

        Usuario salvo = repo.save(u);

        return new UsuarioResponse(
                salvo.getId(),
                salvo.getEmail(),
                salvo.getRole().name()
        );
    }

    public List<UsuarioResponse> listar() {
        return repo.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public UsuarioResponse buscar(Long id){
        Usuario u = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return toResponse(u);
    }

    public UsuarioResponse atualizar(Long id, UsuarioRequest dto){

        Usuario u = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        u.setEmail(dto.getEmail());

        if(dto.getSenha() != null && !dto.getSenha().isBlank()){
            u.setSenha(encoder.encode(dto.getSenha()));
        }

        u.setRole(Role.valueOf(dto.getRole()));

        Usuario atualizado = repo.save(u);

        return toResponse(atualizado);
    }

    public void deletar(Long id){
        if(!repo.existsById(id)){
            throw new RuntimeException("Usuário não encontrado");
        }
        repo.deleteById(id);
    }

    private UsuarioResponse toResponse(Usuario u){
        return new UsuarioResponse(
                u.getId(),
                u.getEmail(),
                u.getRole().name()
        );
    }
}
