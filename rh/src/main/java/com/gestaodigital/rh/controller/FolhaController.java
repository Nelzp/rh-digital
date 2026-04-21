package com.gestaodigital.rh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.gestaodigital.rh.entity.FolhaPagamento;
import com.gestaodigital.rh.repository.FolhaRepository;

@RestController
@RequestMapping("/folha")
@RequiredArgsConstructor
public class FolhaController {

    private final FolhaRepository repo;

    @PostMapping
    public FolhaPagamento calcular(@RequestBody FolhaPagamento f){
        f.setSalarioLiquido(f.getSalarioBase() + f.getBeneficios() - f.getDescontos());
        return repo.save(f);
    }
}