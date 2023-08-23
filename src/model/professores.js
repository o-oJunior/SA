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
  const query =
    "UPDATE professor SET matricula=$1, nome=$2, cpf=$3, telefone=$4 WHERE id=$5";

  const editarProfessor = [
    professor.matricula,
    professor.nome,
    professor.cpf,
    professor.telefone,
    id,
  ];

  database.query(query, editarProfessor, callback);
}

module.exports = {
  buscarTodosProfessores,
  deletarProfessor,
  adicionarProfessor,
  editarProfessor,
};
