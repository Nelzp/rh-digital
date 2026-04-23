package com.gestaodigital.rh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.gestaodigital.rh.entity.FolhaPagamento;
import com.gestaodigital.rh.service.FolhaService;

import java.util.List;

@RestController
@RequestMapping("/folha")
@RequiredArgsConstructor
public class FolhaController {

    private final FolhaService service;

    @PostMapping
    public FolhaPagamento calcular(@RequestBody FolhaPagamento f){
        return service.calcular(f);
    }

    @GetMapping
    public List<FolhaPagamento> listar(){
        return service.listar();
    }
}