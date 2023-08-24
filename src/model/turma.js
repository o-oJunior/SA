const { database } = require("pg/lib/defaults");

function buscarTodasTurmas(callback) {
  database.query("SELECT * FROM turma", callback);
}

module.exports = { buscarTodasTurmas };
