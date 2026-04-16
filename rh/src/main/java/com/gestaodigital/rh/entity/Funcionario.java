package com.gestaodigital.rh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Funcionario {

    @Id
    @GeneratedValue
    private Long id;

    private String nome;
    private String cargo;
    private Double salarioBase;

    @OneToOne
    private Usuario usuario;
}
