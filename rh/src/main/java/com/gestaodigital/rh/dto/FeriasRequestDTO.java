package com.gestaodigital.rh.dto;

import com.gestaodigital.rh.enums.StatusFerias;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

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
