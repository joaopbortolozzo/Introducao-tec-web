/*
  Arquivo: api.js
  Responsabilidade: concentrar as chamadas para a API.

  Backend esperado:
  http://localhost:3000

  Rotas disponíveis no backend:
  GET    /alunos
  GET    /alunos?situacao=Ativo
  GET    /alunos/:ra
  POST   /alunos
  PUT    /alunos/:ra
  DELETE /alunos/:ra
*/

const API_BASE_URL = "http://localhost:3000";

async function listarAlunosApi(situacao = "") {
  // TODO Aula 09:
  // 1. Montar a URL /alunos ou /alunos?situacao=...
  // 2. Fazer fetch com método GET
  // 3. Converter resposta para JSON
  // 4. Retornar a lista de alunos
  console.log("TODO: listarAlunosApi", situacao);
}

async function buscarAlunoApi(ra) {
  // TODO Aula 09:
  // GET http://localhost:3000/alunos/:ra
  console.log("TODO: buscarAlunoApi", ra);
}

async function cadastrarAlunoApi(aluno) {
  // TODO Aula 09:
  // POST http://localhost:3000/alunos
  // headers: { "Content-Type": "application/json" }
  // body: JSON.stringify(aluno)
  console.log("TODO: cadastrarAlunoApi", aluno);
}

async function atualizarAlunoApi(ra, aluno) {
  // TODO Aula 09:
  // PUT http://localhost:3000/alunos/:ra
  // headers: { "Content-Type": "application/json" }
  // body: JSON.stringify(aluno)
  console.log("TODO: atualizarAlunoApi", ra, aluno);
}

async function inativarAlunoApi(ra) {
  // TODO Aula 09:
  // DELETE http://localhost:3000/alunos/:ra
  console.log("TODO: inativarAlunoApi", ra);
}
