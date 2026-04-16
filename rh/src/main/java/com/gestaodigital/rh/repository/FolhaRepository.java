package com.gestaodigital.rh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestaodigital.rh.entity.FolhaPagamento;

public interface FolhaRepository extends JpaRepository<FolhaPagamento, Long> {
}
