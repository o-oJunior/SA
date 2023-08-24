const database = require("../config/database");

function buscarTodasTurmas(callback) {
  database.query("SELECT * FROM turma", callback);
}

function deletarTurma(id, callback) {
  const query = "DELETE FROM turma WHERE id = $1;";

  database.query(query, [id], callback);
}

module.exports = { 
  buscarTodasTurmas,
  deletarTurma
};
