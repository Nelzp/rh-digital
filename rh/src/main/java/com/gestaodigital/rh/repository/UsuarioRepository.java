package com.gestaodigital.rh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestaodigital.rh.entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
