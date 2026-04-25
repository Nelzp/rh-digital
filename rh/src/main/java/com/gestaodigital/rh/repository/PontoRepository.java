package com.gestaodigital.rh.repository;

import com.gestaodigital.rh.entity.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface PontoRepository extends JpaRepository<Ponto, Long> {

    List<Ponto> findByFuncionarioIdAndDataHoraBetween(
            Long funcionarioId,
            LocalDateTime inicio,
            LocalDateTime fim
    );
}
