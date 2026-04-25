# Sistema de Gestão de RH

## 📌 Sobre o Projeto

Sistema backend desenvolvido em **Java + Spring Boot** para
gerenciamento de recursos humanos.

## 🚀 Funcionalidades

-   Cadastro de usuários com cargos e salários automáticos
-   Controle de funcionários
-   Registro de ponto (Entrada, Almoço, Saída)
-   Solicitação e aprovação de férias
-   Controle de permissões (ADMIN, RH, FUNCIONARIO)
-   Autenticação com JWT

## 🛠 Tecnologias

-   Java 17+
-   Spring Boot
-   Spring Security + JWT
-   Spring Data JPA
-   PostgreSQL
-   Swagger

## 🔐 Regras de Negócio

-   Apenas **ADMIN** pode deletar funcionários
-   Apenas **RH** pode aprovar férias
-   Funcionário bate ponto seguindo ordem:
    -   ENTRADA → INICIO_ALMOCO → FIM_ALMOCO → SAIDA
-   Salário definido automaticamente pelo cargo

## 📂 Estrutura

    controller/
    service/
    repository/
    entity/
    dto/
    security/

## ▶️ Como rodar

1.  Clone o projeto
2.  Configure o banco PostgreSQL
3.  Execute:

```{=html}
<!-- -->
```
    mvn spring-boot:run

## 🧪 Testes no Swagger

Acesse:

    http://localhost:8080/swagger-ui.html

1.  Faça login e copie o token
2.  Clique em **Authorize**
3.  Cole:

```{=html}
<!-- -->
```
    Bearer SEU_TOKEN

## 📌 Endpoints principais

### Usuário

-   POST /usuarios
-   GET /usuarios
-   DELETE /usuarios/{id}

### Funcionário

-   GET /funcionarios

### Férias

-   POST /ferias
-   PUT /ferias/{id}/aprovar

### Ponto

-   POST /ponto
-   GET /ponto
