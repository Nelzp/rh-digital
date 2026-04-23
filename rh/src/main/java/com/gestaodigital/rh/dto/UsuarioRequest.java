package com.gestaodigital.rh.dto;

import jakarta.validation.constraints.*;

public class UsuarioRequest {

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 3, message = "Senha deve ter no mínimo 3 caracteres")
    private String senha;

    @NotNull(message = "Role é obrigatória")
    private String role;

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}
