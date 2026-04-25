package com.gestaodigital.rh.enums;

public enum Cargo {

    ESTAGIARIO(1500.0),
    JUNIOR(3000.0),
    PLENO(5000.0),
    SENIOR(8000.0),
    GERENTE(12000.0),
    DIRETOR(20000.0);

    private final Double salarioBase;

    Cargo(Double salarioBase) {
        this.salarioBase = salarioBase;
    }

    public Double getSalarioBase() {
        return salarioBase;
    }
}
