package com.gestaodigital.rh.service;

import com.gestaodigital.rh.entity.Funcionario;
import com.gestaodigital.rh.repository.FuncionarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FuncionarioService {

    private final FuncionarioRepository repository;

    public Funcionario criar(Funcionario f){
        f.setSalarioBase(f.getCargo().getSalarioBase());
        return repository.save(f);
    }

    public List<Funcionario> listar(){
        return repository.findAll();
    }

    public Funcionario buscar(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
    }

    public void deletar(Long id){
        repository.deleteById(id);
    }
}
