const database = require("../config/database");

function buscarTodosDias() {
  return database.query("SELECT * FROM dia");
}

module.exports = { buscarTodosDias };
