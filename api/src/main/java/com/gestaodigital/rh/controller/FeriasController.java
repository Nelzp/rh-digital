package com.gestaodigital.rh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.gestaodigital.rh.dto.FeriasRequestDTO;
import com.gestaodigital.rh.entity.Ferias;
import com.gestaodigital.rh.service.FeriasService;

import java.util.List;

@RestController
@RequestMapping("/ferias")
@RequiredArgsConstructor
public class FeriasController {

    private final FeriasService service;

    @PostMapping
    public Ferias solicitar(@RequestBody FeriasRequestDTO dto){
        return service.solicitar(dto);
    }

    @PutMapping("/{id}/aprovar")
    public Ferias aprovar(@PathVariable Long id){
        return service.aprovar(id);
    }

    @GetMapping
    public List<Ferias> listar(){
        return service.listar();
    }
}
