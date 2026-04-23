package com.gestaodigital.rh.controller;

import com.gestaodigital.rh.dto.UsuarioRequest;
import com.gestaodigital.rh.dto.UsuarioResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.gestaodigital.rh.entity.Usuario;
import com.gestaodigital.rh.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService service;

    @PostMapping
    public UsuarioResponse criar(@RequestBody @Valid UsuarioRequest dto){
        return service.criar(dto);
    }

    @GetMapping
    public List<UsuarioResponse> listar(){
        return service.listar();
    }

    @GetMapping("/{id}")
    public UsuarioResponse buscar(@PathVariable Long id){
        return service.buscar(id);
    }

    @PutMapping("/{id}")
    public UsuarioResponse atualizar(@PathVariable Long id,
                                     @RequestBody @Valid UsuarioRequest dto){
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        service.deletar(id);
    }
}
