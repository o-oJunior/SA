const database = require("../config/database");

function buscarTodasDisciplinas(callback) {
  database.query("SELECT * FROM disciplina", callback);
}

function deletarDisciplina(id, callback) {
  database.query("DELETE FROM disciplina WHERE id = $1", [id], callback);
}

module.exports = { buscarTodasDisciplinas, deletarDisciplina };
