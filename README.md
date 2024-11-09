# Sistema de Gerenciamento de Alunos e Cursos

Este projeto é uma aplicação de gerenciamento de alunos e cursos, onde é possível adicionar, editar e excluir informações de alunos e seus cursos relacionados.

## Tecnologias Utilizadas

- **Frontend**:
  - Vite-React.js
  - React Router
  - Axios
  - CSS

  - **Backend**:
  - Node.js
  - Express
  - Cors
  - Prisma (para ORM com banco de dados)
  - @prisma/client
  - PostgreSQL
  - Express
  - Express-validator


## 💻 Sobre o projeto

O Sistema de Gerenciamento de Cursos e Alunos é uma aplicação que tem como objetivo facilitar o gerenciamento de informações de alunos e cursos em uma instituição de ensino. Este projeto foi desenvolvido utilizando Vite-React para a construção da interface do usuário (front-end) e Prisma com PostgreSQL para a manipulação de dados (back-end).


## ⚙️ Funcionalidades

- [x] Empresa pode gerenciar seus alunos e cursos:
  - [x] Cadastrando seus alunos,
  - [x] Adicionando os cursos que os alunos concluiram e que concluirão,
  - [x] Fazendo atualizações de cadastro,
  - [x] Vinculando de desvinculando alunos de cursos,
  - [x] Deletando alunos e cursos,
  - [x] Visualizando uma tabela com todos os alunos cadastrados,
  - [x] Filtrando na barra de pesquisa o aluno que deseja.
 

---

## 🎨 Layout

O layout da aplicação está disponível no Figma:

"https://www.figma.com/design/pt2bqoYhwu1qepSpgW8XOQ/Trindtech-Sele%C3%A7%C3%A3o?node-id=0-1&node-type=canvas&t=eokFGohHpNSDr2Ir-0">



---

## 🚀 Como executar o projeto

Este projeto é divido em duas partes:
1. Backend (pasta Back-end) 
2. Frontend (pasta Front-end)


💡O Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- Node.js
- PostgreSQL
- Git

### Passo a Passo

#### 1. Clonar o repositório

git clone https://github.com/Liquer-Cami/Sistema-de-Gerenciamento-Cursos-e-Alunos-Trindtech

#### 2. Configurar o Banco de Dados (PostgreSQL)
- Crie um banco de dados no PostgreSQL.
- No backend, crie um arquivo `.env` com as credenciais do banco de dados:
  DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

#### 3. Configuração do Backend

**Acesse a pasta do backend:**
cd Back-end

**Instale as dependências:**
npm install

**Execute as migrações do Prisma para criar as tabelas no banco de dados:**
npx prisma migrate dev
npx prisma generate

**Inicie o servidor backend:**
node server.js

 O backend estará disponível em `http://localhost:3001`.

#### 3. Configuração do Front-end

**Acesse a pasta do frontend:**
cd Front-end
cd Sistema-gerenciamento-cursos-alunos

**Instale as dependências:**
npm install

**Inicie o servidor frontend:**
npm run dev

## 📑 Documentação de APIs

1. API Externa: ViaCEP
Esta API é utilizada para buscar informações de endereço a partir de um CEP.

#### Endpoint
URL: https://viacep.com.br/ws/{cep}/json/
Método: GET

#### Exemplo de Requisição
GET https://viacep.com.br/ws/01001000/json/

2. API de Gerenciamento de Cursos e Alunos

Esta API foi desenvolvida para gerenciar dados de cursos e alunos, permitindo operações de criação, leitura, atualização e exclusão (CRUD). A API também inclui endpoints para listar informações de cursos, alunos e associações entre eles.

1. Cadastrar 
Este endpoint cria um novo aluno e permite associar cursos a ele.

URL: /cadastro
Método: POST
Campos Obrigatórios: nome, email, cep, pais, numeroCasa, e uma lista de cursos com nome e dataConclusao.

2. Listar
Consulta todos os alunos cadastrados e seus respectivos cursos.

URL: /
Método: GET
Filtro Opcional: nome

3. Obter por ID
Obtenha informações detalhadas de um aluno específico.

URL: /:id
Método: GET

4. Editar 
Atualize os dados de um aluno específico e altere seus cursos.

URL: /edit/:id
Método: PUT

5. Deletar 
Remove um aluno e suas associações com cursos do sistema.

URL: /alunos/:id
Método: DELETE


## 📂 Estrutura do Banco de Dados

O script para criar a estrutura do banco de dados necessário para a API está localizado na pasta back-end, no arquivo estrutura.sql. Este script inclui as tabelas e relacionamentos necessários para o funcionamento da aplicação.








