# ✅ Task Manager

O **Task Manager** é uma aplicação web full-stack para gerenciamento de tarefas pessoais.

A aplicação permite que usuários criem suas próprias contas, realizem login e gerenciem tarefas de forma individual. Cada usuário possui acesso somente às suas próprias tarefas, com autenticação baseada em JWT.

O projeto foi desenvolvido com o objetivo de consolidar conceitos de desenvolvimento **Full Stack**, integrando uma aplicação React a uma API própria desenvolvida com Node.js, Express e MySQL.

---

## 🚀 Funcionalidades

- Cadastro de usuários
- Login com e-mail e senha
- Autenticação utilizando JWT
- Senhas protegidas com hash utilizando bcrypt
- Identificação do usuário autenticado
- Criação de tarefas
- Listagem de tarefas
- Edição do título das tarefas
- Marcação de tarefas como concluídas ou pendentes
- Exclusão de tarefas com confirmação
- Filtros de tarefas:
  - Todas
  - Pendentes
  - Concluídas
- Isolamento das tarefas por usuário
- Persistência dos dados em banco MySQL
- Interface responsiva

---

## 🛠️ Tecnologias utilizadas

### Front-end

- React
- TypeScript
- Vite
- CSS Modules
- Fetch API

### Back-end

- Node.js
- Express
- TypeScript
- JWT (JSON Web Token)
- bcrypt
- mysql2
- dotenv
- CORS

### Banco de dados

- MySQL 8

### Ambiente

- Docker
- Docker Compose

---

## 📁 Estrutura do projeto

```text
task-manager/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── database/
│       ├── middlewares/
│       ├── routes/
│       ├── types/
│       └── server.ts
│
├── database/
│   └── init.sql
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── types/
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🔐 Autenticação

A aplicação utiliza **JWT (JSON Web Token)** para autenticação.

Após realizar login, o backend gera um token que deve ser enviado nas requisições protegidas:

```text
Authorization: Bearer <token>
```

O middleware de autenticação valida o token e identifica o usuário responsável pela requisição.

As tarefas são sempre consultadas e modificadas utilizando o ID obtido através do usuário autenticado, impedindo que um usuário acesse as tarefas de outro.

---

## 🗄️ Banco de dados

O projeto utiliza MySQL e possui duas tabelas principais:

### Users

Armazena os usuários cadastrados.

```text
users
├── id
├── name
├── email
└── password
```

### Tasks

Armazena as tarefas e relaciona cada tarefa ao seu usuário.

```text
tasks
├── id
├── title
├── completed
└── user_id
```

A relação entre usuários e tarefas é de **1:N**:

```text
User
  │
  └── possui várias Tasks
```

O campo `user_id` é uma chave estrangeira que referencia `users.id`.

---

## 🔗 Principais endpoints

### Usuários

```http
POST /users
GET /users/me
```

### Autenticação

```http
POST /login
```

### Tarefas

As rotas de tarefas são protegidas por autenticação JWT.

```http
GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

---

## 💻 Executando o projeto localmente

### Pré-requisitos

Antes de iniciar, é necessário possuir:

- Node.js
- npm
- Docker
- Docker Compose

---

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd task-manager
```

---

### 2. Configure o backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` utilizando `.env.example` como referência:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=task_manager

JWT_SECRET=your_jwt_secret
```

Volte para a raiz:

```bash
cd ..
```

---

### 3. Configure o frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` utilizando `.env.example` como referência:

```env
VITE_API_URL=http://localhost:3000
```

Volte para a raiz:

```bash
cd ..
```

---

### 4. Inicie o banco de dados

Na raiz do projeto:

```bash
docker compose up -d
```

O Docker iniciará o MySQL e, na primeira inicialização, utilizará o arquivo:

```text
database/init.sql
```

para criar as tabelas necessárias.

---

### 5. Inicie o backend

Em um terminal:

```bash
cd backend
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

---

### 6. Inicie o frontend

Em outro terminal:

```bash
cd frontend
npm run dev
```

O Vite informará no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

---

## 🔄 Fluxo da aplicação

```text
Usuário
   ↓
React
   ↓
Fetch API
   ↓
Express
   ↓
Middleware JWT
   ↓
Controllers
   ↓
MySQL
```

O frontend não acessa diretamente o banco de dados. Toda comunicação acontece através da API desenvolvida no backend.

---

## 🔒 Segurança

Algumas práticas utilizadas no projeto:

- Hash de senhas utilizando bcrypt
- Autenticação com JWT
- Rotas de tarefas protegidas por middleware
- Consultas SQL parametrizadas
- Isolamento das tarefas por usuário
- Variáveis de ambiente para configurações sensíveis
- Arquivos `.env` ignorados pelo Git

> Este projeto possui finalidade educacional. Configurações locais do Docker, como usuário e senha do MySQL, foram mantidas simples para facilitar a execução em ambiente de desenvolvimento.

---

## 📚 Conceitos praticados

Durante o desenvolvimento foram aplicados conceitos como:

- CRUD
- API REST
- Métodos HTTP
- Status HTTP
- Programação assíncrona
- Promises e `async/await`
- Fetch API
- React Hooks
- Formulários controlados
- Renderização condicional
- TypeScript
- SQL
- Chaves primárias e estrangeiras
- Relacionamento 1:N
- Autenticação
- Autorização
- Middleware
- Hash de senhas
- JWT
- Variáveis de ambiente
- Docker e persistência com volumes
- Separação entre front-end, back-end e banco de dados

---

## 🌐 Deploy

O deploy da aplicação será disponibilizado posteriormente.

---

## 👨‍💻 Autor

Desenvolvido por **Ricardo Coco** como projeto de estudo e prática de desenvolvimento Full Stack.