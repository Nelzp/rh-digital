package com.gestaodigital.rh.dto;

import com.gestaodigital.rh.enums.TipoPonto;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PontoRequestDTO {

    @NotNull
    private Long usuarioId;

    @NotNull
    private TipoPonto tipo;
}
