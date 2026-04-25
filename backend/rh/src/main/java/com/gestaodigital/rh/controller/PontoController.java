package com.gestaodigital.rh.controller;

import com.gestaodigital.rh.dto.PontoRequestDTO;
import com.gestaodigital.rh.dto.PontoResponseDTO;
import com.gestaodigital.rh.service.PontoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ponto")
@RequiredArgsConstructor
public class PontoController {

    private final PontoService service;

    @PostMapping
    public PontoResponseDTO bater(@RequestBody PontoRequestDTO dto){
        return service.bater(dto);
    }

    @GetMapping
    public List<PontoResponseDTO> listar(){
        return service.listar();
    }
}
