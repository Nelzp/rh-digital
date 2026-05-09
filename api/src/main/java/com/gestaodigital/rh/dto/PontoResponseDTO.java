package com.gestaodigital.rh.dto;

import java.time.LocalDateTime;

import com.gestaodigital.rh.enums.TipoPonto;

import lombok.AllArgsConstructor;
import lombok.Data;

// define o que o backend envia pro frontend quando você busca os pontos dos funcionários.
@Data
@AllArgsConstructor
public class PontoResponseDTO {

    private Long id;
    private String nomeFuncionario;
    private TipoPonto tipo;
    private LocalDateTime dataHora;
}
