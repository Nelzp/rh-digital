package com.gestaodigital.rh.service;

import com.gestaodigital.rh.dto.PontoRequestDTO;
import com.gestaodigital.rh.dto.PontoResponseDTO;
import com.gestaodigital.rh.entity.Funcionario;
import com.gestaodigital.rh.entity.Ponto;
import com.gestaodigital.rh.enums.TipoPonto;
import com.gestaodigital.rh.repository.FuncionarioRepository;
import com.gestaodigital.rh.repository.PontoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PontoService {

    private final PontoRepository pontoRepository;
    private final FuncionarioRepository funcionarioRepository;

    public PontoResponseDTO bater(PontoRequestDTO dto) {

        Funcionario funcionario = funcionarioRepository
                .findByUsuario_Id(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        validarSequencia(funcionario.getId(), dto.getTipo());

        Ponto ponto = new Ponto();
        ponto.setFuncionario(funcionario);
        ponto.setTipo(dto.getTipo());
        ponto.setDataHora(LocalDateTime.now());

        Ponto salvo = pontoRepository.save(ponto);

        return new PontoResponseDTO(
                salvo.getId(),
                funcionario.getNome(),
                salvo.getTipo(),
                salvo.getDataHora()
        );
    }

    public List<PontoResponseDTO> listar() {
        return pontoRepository.findAll().stream()
                .map(p -> new PontoResponseDTO(
                        p.getId(),
                        p.getFuncionario().getNome(),
                        p.getTipo(),
                        p.getDataHora()
                ))
                .toList();
    }

    private void validarSequencia(Long funcionarioId, TipoPonto novoTipo) {

        LocalDate hoje = LocalDate.now();

        List<Ponto> pontosHoje = pontoRepository
                .findByFuncionarioIdAndDataHoraBetween(
                        funcionarioId,
                        hoje.atStartOfDay(),
                        hoje.atTime(23, 59, 59)
                );

        if (pontosHoje.isEmpty() && novoTipo != TipoPonto.ENTRADA) {
            throw new RuntimeException("Primeiro ponto do dia deve ser ENTRADA");
        }

        if (!pontosHoje.isEmpty()) {
            TipoPonto ultimo = pontosHoje.get(pontosHoje.size() - 1).getTipo();

            if (ultimo == TipoPonto.ENTRADA && novoTipo != TipoPonto.INICIO_ALMOCO) {
                throw new RuntimeException("Após ENTRADA deve vir INICIO_ALMOCO");
            }

            if (ultimo == TipoPonto.INICIO_ALMOCO && novoTipo != TipoPonto.FIM_ALMOCO) {
                throw new RuntimeException("Após INICIO_ALMOCO deve vir FIM_ALMOCO");
            }

            if (ultimo == TipoPonto.FIM_ALMOCO && novoTipo != TipoPonto.SAIDA) {
                throw new RuntimeException("Após FIM_ALMOCO deve vir SAIDA");
            }

            if (ultimo == TipoPonto.SAIDA) {
                throw new RuntimeException("Expediente já encerrado");
            }
        }
    }
}
