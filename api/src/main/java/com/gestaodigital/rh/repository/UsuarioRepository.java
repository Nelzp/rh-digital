package com.gestaodigital.rh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.gestaodigital.rh.entity.*;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
