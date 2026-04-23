package com.gestaodigital.rh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.gestaodigital.rh.entity.*;
import com.gestaodigital.rh.repository.FeriasRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeriasService {

    private final FeriasRepository repo;

    public Ferias solicitar(Ferias f){
        f.setStatus(StatusFerias.PENDENTE);
        return repo.save(f);
    }

    public Ferias aprovar(Long id){
        Ferias f = repo.findById(id).orElseThrow();
        f.setStatus(StatusFerias.APROVADO);
        return repo.save(f);
    }

    public List<Ferias> listar(){
        return repo.findAll();
    }
}
