package com.gestaodigital.rh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class FolhaPagamento {

    @Id
    @GeneratedValue
    private Long id;

    private Double salarioBase;
    private Double beneficios;
    private Double descontos;
    private Double salarioLiquido;

    @ManyToOne
    private Funcionario funcionario;
}
