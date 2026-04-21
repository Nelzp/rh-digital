package com.gestaodigital.rh.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter
@Entity
public class Ponto {

    @Id @GeneratedValue
    private Long id;

    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    private TipoPonto tipo;

    @ManyToOne
    private Funcionario funcionario;
}
