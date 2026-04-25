package com.gestaodigital.rh.dto;

import com.gestaodigital.rh.enums.TipoPonto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PontoResponseDTO {

    private Long id;
    private String nomeFuncionario;
    private TipoPonto tipo;
    private LocalDateTime dataHora;
}