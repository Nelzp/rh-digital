package com.gestaodigital.rh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.gestaodigital.rh.dto.FeriasRequestDTO;
import com.gestaodigital.rh.entity.Ferias;
import com.gestaodigital.rh.entity.Funcionario;
import com.gestaodigital.rh.entity.Usuario;
import com.gestaodigital.rh.enums.StatusFerias;
import com.gestaodigital.rh.repository.FeriasRepository;
import com.gestaodigital.rh.repository.FuncionarioRepository;
import com.gestaodigital.rh.repository.UsuarioRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeriasService {

    private final FeriasRepository repository;
    private final FuncionarioRepository funcionarioRepository;
    private final UsuarioRepository usuarioRepository;

    public Ferias solicitar(FeriasRequestDTO dto) {

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Funcionario funcionario = funcionarioRepository
                .findByUsuario_Id(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        Ferias ferias = new Ferias();
        ferias.setInicio(dto.getInicio());
        ferias.setFim(dto.getFim());
        ferias.setFuncionario(funcionario);

        ferias.setStatus(
                dto.getStatus() != null ? dto.getStatus() : StatusFerias.PENDENTE
        );

        return repository.save(ferias);
    }

    public Ferias aprovar(Long id){
        Ferias f = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Férias não encontrada"));

        f.setStatus(StatusFerias.APROVADO);
        return repository.save(f);
    }

    public List<Ferias> listar(){
        return repository.findAll();
    }
}
