const database = require("../config/database");

function buscarTodasTurmas(callback) {
  database.query("SELECT * FROM turma", callback);
}

function adicionarTurma(turma, callback) {
  const query =
    "INSERT INTO turma(codigo, numero_alunos, periodo) VALUES ($1, $2, $3)";

  const inserirTurma = [turma.codigo, turma.numero_alunos, turma.periodo];
  database.query(query, inserirTurma, callback);
}

function editarTurma(id, turma, callback) {
  const valor = Object.values(turma);
  const chave = Object.keys(turma);
  const alterarTurma = chave.map((atributo, i) => `${atributo}='${valor[i]}'`);
  const query = `UPDATE professor SET ${alterarTurma} WHERE id=${id}`;

  database.query(query, alterarTurma, callback);
}

function deletarTurma(id, callback) {
  const query = "DELETE FROM turma WHERE id = $1;";

  database.query(query, [id], callback);
}

module.exports = {
  buscarTodasTurmas,
  deletarTurma,
  adicionarTurma,
  editarTurma
};
