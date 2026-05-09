package com.gestaodigital.rh.dto;

// dados que o usuário envia pra fazer login
public record LoginRequest(String email, String password) {
}
