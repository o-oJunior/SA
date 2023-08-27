const database = require("../config/database");

function buscarTodasDisciplinas(callback) {
  database.query("SELECT * FROM disciplina", callback);
}

module.exports = { buscarTodasDisciplinas };
