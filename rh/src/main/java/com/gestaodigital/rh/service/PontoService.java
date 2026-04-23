package com.gestaodigital.rh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.gestaodigital.rh.entity.Ponto;
import com.gestaodigital.rh.repository.PontoRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PontoService {

    private final PontoRepository repo;

    public Ponto bater(Ponto ponto){
        ponto.setDataHora(LocalDateTime.now());
        return repo.save(ponto);
    }

    public List<Ponto> listar(){
        return repo.findAll();
    }
}
