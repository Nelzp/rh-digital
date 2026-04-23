package com.gestaodigital.rh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.gestaodigital.rh.entity.FolhaPagamento;
import com.gestaodigital.rh.repository.FolhaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FolhaService {

    private final FolhaRepository repo;

    public FolhaPagamento calcular(FolhaPagamento f){
        f.setSalarioLiquido(
                f.getSalarioBase() +
                        f.getBeneficios() -
                        f.getDescontos()
        );
        return repo.save(f);
    }

    public List<FolhaPagamento> listar(){
        return repo.findAll();
    }
}
