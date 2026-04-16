/* package com.gestaodigital.rh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.gestaodigital.rh.entity.FolhaPagamento;
import com.gestaodigital.rh.repository.FolhaRepository;
import com.gestaodigital.rh.service.FolhaService;
import com.gestaodigital.rh.service.PdfService;

@RestController
@RequestMapping("/folha")
@RequiredArgsConstructor
public class FolhaController {

    private final FolhaService service;
    private final PdfService pdf;
    private final FolhaRepository repo;

    @PostMapping
    public FolhaPagamento calcular(@RequestBody FolhaPagamento f){
        return repo.save(service.calcular(f));
    }

    @GetMapping("/pdf/{id}")
    public byte[] pdf(@PathVariable Long id) throws Exception {
        return pdf.gerar(repo.findById(id).orElseThrow());
    }
} */