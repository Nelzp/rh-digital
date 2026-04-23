package com.gestaodigital.rh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.gestaodigital.rh.entity.Funcionario;
import com.gestaodigital.rh.service.FuncionarioService;

import java.util.List;

@RestController
@RequestMapping("/funcionarios")
@RequiredArgsConstructor
public class FuncionarioController {

    private final FuncionarioService service;

    @PostMapping
    public Funcionario criar(@RequestBody Funcionario f){
        return service.criar(f);
    }

    @GetMapping
    public List<Funcionario> listar(){
        return service.listar();
    }

    @GetMapping("/{id}")
    public Funcionario buscar(@PathVariable Long id){
        return service.buscar(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        service.deletar(id);
    }
}
