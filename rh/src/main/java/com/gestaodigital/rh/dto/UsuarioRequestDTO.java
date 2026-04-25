package com.gestaodigital.rh.dto;

import com.gestaodigital.rh.enums.Cargo;
import com.gestaodigital.rh.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsuarioRequestDTO {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String senha;

    @NotNull
    private Role role;

    private Cargo cargo;
}
