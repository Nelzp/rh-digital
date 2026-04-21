package com.gestaodigital.rh.controller;

import com.gestaodigital.rh.entity.Ferias;
import com.gestaodigital.rh.entity.StatusFerias;
import com.gestaodigital.rh.repository.FeriasRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ferias")
@RequiredArgsConstructor
public class FeriasController {

    private final FeriasRepository repo;

    @PostMapping
    public Ferias solicitar(@RequestBody Ferias f){
        f.setStatus(StatusFerias.PENDENTE);
        return repo.save(f);
    }
}
