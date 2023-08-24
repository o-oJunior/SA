const database = require("../config/database");

function buscarTodosProfessores(callback) {
  database.query("SELECT * FROM professor", callback);
}

function deletarProfessor(id, callback) {
  const query = "DELETE FROM professor WHERE id = $1;";

  database.query(query, [id], callback);
}

function adicionarProfessor(professor, callback) {
  const adicionarProfessor = [
    professor.matricula,
    professor.nome,
    professor.cpf,
    professor.telefone,
  ];

  database.query(
    "INSERT INTO professor(matricula, nome, cpf, telefone) VALUES ($1, $2, $3, $4)",
    adicionarProfessor,
    callback
  );
}

function editarProfessor(id, professor, callback) {
  const valor = Object.values(professor);
  const chave = Object.keys(professor);
  const editarProfessor = chave.map((atributo, i) => `${atributo}='${valor[i]}'`);
  const query = `UPDATE professor SET ${editarProfessor} WHERE id=${id}`;

  database.query(query, callback);
}

module.exports = {
  buscarTodosProfessores,
  deletarProfessor,
  adicionarProfessor,
  editarProfessor,
};
