# Sistema de Cadastro e Login com Flask

Este projeto é um sistema simples de cadastro e login utilizando Flask e SQLite. O backend é feito em Python com Flask, e o frontend básico é servido diretamente pelo Flask. O projeto está configurado para deploy na plataforma Render usando Gunicorn.

---

## Funcionalidades

- Cadastro de usuários com dados pessoais completos
- Login com autenticação via senha hash (SHA-256)
- Armazenamento dos dados em banco SQLite local
- Frontend simples para interação (HTML, CSS, JS)
- Deploy facilitado com Gunicorn no Render

---

## Tecnologias Utilizadas

- Python 3
- Flask
- SQLite
- Gunicorn
- Render.com (plataforma de hosting)

---

## Estrutura do Projeto

## Estrutura do Projeto

.
├── app.py # Código principal da aplicação Flask
├── banco.db # Banco de dados SQLite (gerado automaticamente)
├── requirements.txt # Lista de dependências Python
├── Procfile # Comando para deploy no Render
├── index.html # Página inicial
├── styles.css # Estilo CSS
├── script.js # JavaScript do frontend
└── client/ # Arquivos públicos para área do cliente (HTML, etc) 

