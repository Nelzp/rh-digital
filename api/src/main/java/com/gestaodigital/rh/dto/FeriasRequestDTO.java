package com.gestaodigital.rh.dto;

import java.time.LocalDate;

import com.gestaodigital.rh.enums.StatusFerias;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Define o que o frontend envia pro backend quando alguém pede férias.
// dados que entram na API para solicitar férias
@Data
public class FeriasRequestDTO {

    @NotNull
    private LocalDate inicio;

    @NotNull
    private LocalDate fim;

    @NotNull
    private Long usuarioId;

    private StatusFerias status;
}
