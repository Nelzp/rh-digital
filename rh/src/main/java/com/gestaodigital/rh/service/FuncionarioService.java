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

    public Funcionario criar(Funcionario f){
        return repo.save(f);
    }

    public List<Funcionario> listar(){
        return repo.findAll();
    }

    public Funcionario buscar(Long id){
        return repo.findById(id).orElseThrow();
    }

    public void deletar(Long id){
        repo.deleteById(id);
    }
}
