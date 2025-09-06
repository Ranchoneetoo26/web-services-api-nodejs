# Web Services API com Node.js

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

API RESTful desenvolvida com Node.js para gerenciar usuários e produtos. Este projeto serve como um modelo robusto para a construção de serviços de backend, incluindo autenticação, conexão com banco de dados e um ambiente totalmente containerizado.

---

## 📋 Índice

-   [Sobre o Projeto](#-sobre-o-projeto)
-   [Funcionalidades](#-funcionalidades)
-   [Tecnologias Utilizadas](#-tecnologias-utilizadas)
-   [Como Executar](#-como-executar)
-   [Endpoints da API](#-endpoints-da-api)
-   [Licença](#-licença)

---

##  Sobre o Projeto

Este projeto implementa uma API de web services utilizando Node.js e Express. Ele gerencia duas entidades principais: Usuários e Produtos, e inclui um sistema de autenticação via JWT para proteger rotas específicas. O objetivo é fornecer uma base sólida e escalável para aplicações backend, seguindo as melhores práticas de desenvolvimento.

---

## ✨ Funcionalidades

-   ✅ **Usuários**: CRUD completo (Create, Read, Update, Delete).
-   ✅ **Produtos**: CRUD completo, com rotas protegidas por autenticação.
-   ✅ **Autenticação**: Sistema de login gerando um token JWT para acesso a rotas seguras.
-   ✅ **Persistência de Dados**: Conexão com banco de dados PostgreSQL utilizando o ORM TypeORM.
-   ✅ **Containerização**: Ambiente de desenvolvimento e produção totalmente gerenciado com Docker e Docker Compose.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

-   **Backend:** Node.js, Express.js, TypeScript
-   **Banco de Dados:** PostgreSQL
-   **ORM:** TypeORM
-   **Containerization:** Docker, Docker Compose
-   **Autenticação:** JWT (jsonwebtoken), bcrypt.js
-   **Validação:** class-validator
-   **Testes:** Jest

---

## 💻 Como Executar

Siga os passos abaixo para executar o projeto em seu ambiente local.

**Pré-requisitos:**

-   [Node.js](https://nodejs.org/en/) (v18+)
-   [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose
-   [Git](https://git-scm.com/)

**1. Clone o repositório:**
```bash
git clone [https://github.com/MatheusMoreira08/web-services-api-nodejs.git](https://github.com/MatheusMoreira08/web-services-api-nodejs.git)
cd web-services-api-nodejs
