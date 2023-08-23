const database = require("../config/database");

function buscarTodosProfessores(callback) {
  database.query("SELECT * FROM professores", callback);
}

function deletarProfessor(id, callback) {
  const query = "DELETE FROM professores WHERE id = $1;";

  database.query(query, [id], callback);
}

function adicionarProfessor(professor, callback) {
  const values = [
    professor.id,
    professor.matricula,
    professor.nome,
    professor.cpf,
    professor.telefone,
  ];

  database.query(
    "INSERT INTO professores(id, matricula, nome, cpf, telefone) VALUES ($1, $2, $3, $4, $5)",
    values,
    callback
  );
}

function editarProfessor(id, requisicao, callback) {
  let query = "UPDATE professores SET";
  const where = `WHERE id = ${id}`;

  const updates = [];

  if(requisicao.hasOwnProperty('matricula')) {
    updates.push(`matricula = '${requisicao.matricula}'`);
  }
  if(requisicao.hasOwnProperty('nome')) {
    updates.push(`nome = '${requisicao.nome}'`);
  }
  if(requisicao.hasOwnProperty('cpf')) {
    updates.push(`cpf = '${requisicao.cpf}'`);
  }
  if(requisicao.hasOwnProperty('telefone')) {
    updates.push(`telefone = '${requisicao.telefone}'`);
  }

  query += " " + updates.join(", ") + " " + where;

  database.query(query, callback);
}

module.exports = {
  buscarTodosProfessores,
  deletarProfessor,
  adicionarProfessor,
  editarProfessor
};
