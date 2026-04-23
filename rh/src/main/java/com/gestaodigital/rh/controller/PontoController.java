package com.gestaodigital.rh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.gestaodigital.rh.entity.Ponto;
import com.gestaodigital.rh.service.PontoService;

import java.util.List;

@RestController
@RequestMapping("/ponto")
@RequiredArgsConstructor
public class PontoController {

    private final PontoService service;

    @PostMapping
    public Ponto bater(@RequestBody Ponto ponto){
        return service.bater(ponto);
    }

    @GetMapping
    public List<Ponto> listar(){
        return service.listar();
    }
}
