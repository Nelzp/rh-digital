package com.gestaodigital.rh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.gestaodigital.rh.entity.*;

public interface PontoRepository extends JpaRepository<Ponto, Long> {
}
