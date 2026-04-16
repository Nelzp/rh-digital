package com.gestaodigital.rh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Ferias {

    @Id
    @GeneratedValue
    private Long id;

    private LocalDate inicio;
    private LocalDate fim;

    @Enumerated(EnumType.STRING)
    // private StatusFerias status;

    @ManyToOne
    private Funcionario funcionario;
}