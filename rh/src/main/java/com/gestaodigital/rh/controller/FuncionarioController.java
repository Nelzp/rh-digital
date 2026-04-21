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
        return service.salvar(f);
    }

    @GetMapping
    public List<Funcionario> listar(){
        return service.listar();
    }
}
