package com.gestaodigital.rh.service;

import com.gestaodigital.rh.dto.UsuarioRequestDTO;
import com.gestaodigital.rh.dto.UsuarioResponse;
import com.gestaodigital.rh.entity.Funcionario;
import com.gestaodigital.rh.entity.Usuario;
import com.gestaodigital.rh.repository.FuncionarioRepository;
import com.gestaodigital.rh.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioResponse criar(UsuarioRequestDTO dto) {

        Usuario usuario = new Usuario();
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
        usuario.setRole(dto.getRole());

        usuario = usuarioRepository.save(usuario);

        if (dto.getCargo() != null) {

            Funcionario funcionario = new Funcionario();
            funcionario.setUsuario(usuario);
            funcionario.setCargo(dto.getCargo()); // ENUM
            funcionario.setSalarioBase(dto.getCargo().getSalarioBase());

            funcionarioRepository.save(funcionario);
        }

        return new UsuarioResponse(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getRole().name()
        );
    }

    public List<UsuarioResponse> listar() {
        return usuarioRepository.findAll()
                .stream()
                .map(u -> new UsuarioResponse(
                        u.getId(),
                        u.getEmail(),
                        u.getRole().name()))
                .toList();
    }

    public UsuarioResponse buscar(Long id) {
        Usuario u = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new UsuarioResponse(
                u.getId(),
                u.getEmail(),
                u.getRole().name()
        );
    }

    public UsuarioResponse atualizar(Long id, UsuarioRequestDTO dto) {

        Usuario u = usuarioRepository.findById(id)
                .orElseThrow();

        u.setEmail(dto.getEmail());
        u.setRole(dto.getRole());

        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            u.setSenha(passwordEncoder.encode(dto.getSenha()));
        }

        usuarioRepository.save(u);

        return new UsuarioResponse(
                u.getId(),
                u.getEmail(),
                u.getRole().name()
        );
    }

    public void deletar(Long id) {
        usuarioRepository.deleteById(id);
    }
}
