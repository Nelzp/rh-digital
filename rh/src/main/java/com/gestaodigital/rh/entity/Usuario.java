package com.gestaodigital.rh.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue
    private Long id;

    private String email;
    private String senha;

    @Enumerated(EnumType.STRING)
    private Role role;
}
