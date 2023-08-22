const database = require("../config/database");

function buscarTodosProfessores(callback) {
  database.query("SELECT * FROM professores", callback);
}

function deletarProfessor(id, callback) {
  const query = "DELETE FROM professores WHERE id = $1;";

  database.query(query, [id], callback);
}

module.exports = {
  buscarTodosProfessores,
  deletarProfessor,
};
