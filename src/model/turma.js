const database = require("../config/database");

function buscarTodasTurmas(callback) {
  database.query("SELECT * FROM turma", callback);
}

module.exports = { buscarTodasTurmas };
