# RH Digital

Sistema fullstack de gestão de Recursos Humanos desenvolvido com Java Spring Boot no backend e TypeScript no frontend.

O projeto possui autenticação, controle de ponto, férias, folha de pagamento e dashboard administrativa, utilizando arquitetura separada entre API e interface web.

---

# Tecnologias Utilizadas

## Backend (API)

* Java 17
* Spring Boot 4
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* PostgreSQL
* Maven
* Lombok
* Swagger / OpenAPI

## Frontend (Web)

* Next.js 16
* React 19
* TypeScript
* TailwindCSS 4
* React Query
* React Hook Form
* Zod
* Shadcn/UI
* Sonner
* Biome

---

# Estrutura do Projeto

```txt
rh-digital-web/
│
├── api/                     # Backend Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── mvnw
│
├── web/                     # Frontend Next.js
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── next.config.ts
│
└── .vscode/
```

---

# Funcionalidades

## Autenticação

* Login de usuários
* Proteção de rotas
* JWT Authentication
* Controle de acesso

## Funcionários

* Cadastro de funcionários
* Associação de usuário
* Gestão de cargos

## Controle de Ponto

* Registro de entrada
* Início de almoço
* Fim de almoço
* Saída
* Validação automática da sequência

## Férias

* Solicitação de férias
* Aprovação/Reprovação
* Controle de status

## Folha de Pagamento

* Consulta de folha
* Cálculo baseado no cargo

---

# Banco de Dados

* PostgreSQL


---

# Como Executar o Projeto

# 1. Clonar o repositório

```bash
git clone https://github.com/Nelzp/rh-digital.git
```

Entrar na pasta:

```bash
cd rh-digital
```

---

# 2. Executar o Backend

Entrar na pasta da API:

```bash
cd api
```

## Windows

```powershell
.\mvnw.cmd spring-boot:run
```

## Linux/Mac

```bash
./mvnw spring-boot:run
```

A API ficará disponível em:

```txt
http://localhost:8080
```

Swagger:

```txt
http://localhost:8080/swagger-ui/index.html
```

---

# 3. Executar o Frontend

Abrir outro terminal:

```bash
cd web
```

Instalar dependências:

```bash
npm install
```


Executar o projeto:

```bash
npm run dev
```

Frontend disponível em:

```txt
http://localhost:3000
```

---

# Integração Frontend + Backend

O frontend consome a API Spring Boot utilizando requisições HTTP.

API Base URL:

```txt
http://localhost:8080
```

---

# Swagger

A documentação da API pode ser acessada em:

```txt
http://localhost:8080/swagger-ui/index.html
```

---

# Principais Endpoints

## Auth

```txt
POST /auth/login
```

## Usuários

```txt
POST /usuarios
GET /usuarios
PUT /usuarios/{id}
DELETE /usuarios/{id}
```

## Funcionários

```txt
POST /funcionarios
GET /funcionarios
```

## Ponto

```txt
POST /ponto
GET /ponto
```

## Férias

```txt
POST /ferias
GET /ferias
PUT /ferias/{id}/aprovar
```

## Folha

```txt
GET /folha
```

---

# Regras de Negócio

## Sequência obrigatória do ponto

```txt
ENTRADA
↓
INICIO_ALMOCO
↓
FIM_ALMOCO
↓
SAIDA
```

O sistema impede registros inválidos.

---

# Status do Projeto

✅ Backend funcional

✅ Frontend funcional

✅ Integração frontend/backend

✅ PostgreSQL

✅ Swagger

---
