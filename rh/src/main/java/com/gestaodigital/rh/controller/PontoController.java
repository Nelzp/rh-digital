package com.gestaodigital.rh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.gestaodigital.rh.entity.Ponto;
import com.gestaodigital.rh.repository.PontoRepository;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/ponto")
@RequiredArgsConstructor
public class PontoController {

    private final PontoRepository repo;

    @PostMapping
    public Ponto bater(@RequestBody Ponto p){
        p.setDataHora(LocalDateTime.now());
        return repo.save(p);
    }
}
