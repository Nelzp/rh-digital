package com.gestaodigital.rh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.gestaodigital.rh.entity.Funcionario;
import com.gestaodigital.rh.repository.FuncionarioRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FuncionarioService {

    private final FuncionarioRepository repo;

    public Funcionario salvar(Funcionario f){
        return repo.save(f);
    }

    public List<Funcionario> listar(){
        return repo.findAll();
    }
}
