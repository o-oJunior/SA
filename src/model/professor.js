const database = require("../config/database");

function buscarTodosProfessores() {
  return database.query("SELECT * FROM professor");
}

function buscarProfessorPorID(id){
  return database.query("SELECT * FROM professor WHERE id = $1", [id])
}

function deletarProfessor(id) {
  const query = "DELETE FROM professor WHERE id = $1;";

  return database.query(query, [id]);
}

function adicionarProfessor(professor) {
  const query =
    "INSERT INTO professor(matricula, nome, cpf, telefone) VALUES ($1, $2, $3, $4)";
  const adicionarProfessor = [
    professor.matricula,
    professor.nome,
    professor.cpf,
    professor.telefone,
  ];

  return database.query(query, adicionarProfessor);
}

function editarProfessor(id, professor) {
  const valor = Object.values(professor);
  const chave = Object.keys(professor);
  const editarProfessor = chave.map(
    (atributo, i) => `${atributo}='${valor[i]}'`
  );
  const query = `UPDATE professor SET ${editarProfessor} WHERE id=${id}`;

  return database.query(query);
}

module.exports = {
  buscarTodosProfessores,
  buscarProfessorPorID,
  deletarProfessor,
  adicionarProfessor,
  editarProfessor,
};
