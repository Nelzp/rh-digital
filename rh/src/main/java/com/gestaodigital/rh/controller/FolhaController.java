package com.gestaodigital.rh.controller;

import com.gestaodigital.rh.entity.FolhaPagamento;
import com.gestaodigital.rh.entity.Funcionario;
import com.gestaodigital.rh.service.FolhaService;
import com.gestaodigital.rh.service.FuncionarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/folha")
@RequiredArgsConstructor
public class FolhaController {

    private final FolhaService service;
    private final FuncionarioService funcionarioService;

    @PostMapping("/{funcionarioId}")
    public FolhaPagamento gerar(@PathVariable Long funcionarioId) {

        Funcionario funcionario = funcionarioService.buscar(funcionarioId);

        return service.gerar(funcionario);
    }
}