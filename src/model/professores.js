const database = require("../config/database");

function buscarTodosProfessores(callback) {
  database.query("SELECT * FROM professores", callback);
}

module.exports = {
  buscarTodosProfessores,
};
