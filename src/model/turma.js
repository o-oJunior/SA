const database = require("../config/database");

function buscarTodasTurmas(callback) {
  database.query("SELECT * FROM turma", callback);
}

function adicionarTurma(turma, callback) {
  const query =
    "INSERT INTO turma(codigo, numero_alunos, perido) VALUES ($1, $2, $3)";
  const inserirTurma = [turma.codigo, turma.numero_alunos, turma.periodo];
  database.query(query, inserirTurma, callback);
}

function deletarTurma(id, callback) {
  const query = "DELETE FROM turma WHERE id = $1;";

  database.query(query, [id], callback);
}

module.exports = {
  buscarTodasTurmas,
  deletarTurma,
  adicionarTurma
};
