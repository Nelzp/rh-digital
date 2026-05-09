package com.gestaodigital.rh.service;

import com.gestaodigital.rh.entity.FolhaPagamento;
import com.gestaodigital.rh.entity.Funcionario;
import com.gestaodigital.rh.repository.FolhaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FolhaService {

    private final FolhaRepository repository;

    public FolhaPagamento gerar(Funcionario funcionario) {

        double salarioBase = funcionario.getSalarioBase();

        double beneficios = calcularBonus(salarioBase);
        double descontos = calcularDescontos(salarioBase);

        double salarioLiquido = salarioBase + beneficios - descontos;

        FolhaPagamento folha = new FolhaPagamento();
        folha.setFuncionario(funcionario);
        folha.setSalarioBase(salarioBase);
        folha.setBeneficios(beneficios);
        folha.setDescontos(descontos);
        folha.setSalarioLiquido(salarioLiquido);

        return repository.save(folha);
    }

    private double calcularBonus(double salario) {
        return salario * 0.10;
    }

    private double calcularDescontos(double salario) {
        return salario * 0.08;
    }
}
