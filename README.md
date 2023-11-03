# API de Manipulação de JSON para Filmes

Esta é uma API construída com o framework Express.js e Node.js, projetada para manipular dados de filmes em formato JSON. A API é responsável por organizar as rotas da aplicação e invocar funções com base nas chamadas aos endpoints. Ela segue os padrões de verbos HTTP (GET, POST, PUT, PATCH, DELETE) e respostas HTTP (200, 404, 301, etc.), aderindo à semântica do protocolo.

## Funcionalidades

- **GET** `/movies`: Retorna a lista de todos os filmes disponíveis.

- **GET** `/movies/:id`: Retorna os detalhes de um filme específico com base no ID fornecido.

- **POST** `/movies`: Adiciona um novo filme à lista.

- **PUT** `/movies/:id`: Atualiza os detalhes de um filme existente com base no ID fornecido.

- **PATCH** `/movies/:id`: Atualiza parcialmente os detalhes de um filme com base no ID fornecido.

- **DELETE** `/movies/:id`: Exclui um filme com base no ID fornecido.

## Uso

Você pode usar esta API para criar, recuperar, atualizar e excluir informações sobre filmes. Aqui estão alguns exemplos de como fazer chamadas HTTP para os endpoints disponíveis:

- Para obter todos os filmes:
GET http://localhost:4000/movies

- Para adicionar um novo filme:
POST http://localhost:4000/movies

- Para excluir um filme:
DELETE http://localhost:4000/movies/:id

## Configuração

Antes de usar esta API, certifique-se de ter Node.js instalado em sua máquina. Você também precisará instalar as dependências. Para fazer isso, execute o seguinte comando na raiz do projeto:

```bash
npm install

Depois de instalar as dependências, você pode iniciar o servidor com o comando:
`npm start`

Projeto desenvolvido como parte da disciplina Back-end com Express & Node.js do Instituto Infnet.
