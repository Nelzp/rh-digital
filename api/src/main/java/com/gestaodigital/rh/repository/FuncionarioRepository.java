package com.gestaodigital.rh.repository;

import com.gestaodigital.rh.entity.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    Optional<Funcionario> findByUsuario_Id(Long usuarioId);
}
