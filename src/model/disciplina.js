const database = require("../config/database");

function buscarTodasDisciplinas() {
  return database.query("SELECT * FROM disciplina");
}

function buscarDisciplinaPorID(id) {
  return database.query("SELECT * FROM disciplina WHERE id = $1", [id]);
}

function adicionarDisciplina(disciplina) {
  const query =
    "INSERT INTO disciplina(nome, semestre, carga_horaria, id_professor, id_turma) VALUES ($1, $2, $3, $4, $5)";
  const inserirDisciplina = [
    disciplina.nome,
    disciplina.semestre,
    disciplina.carga_horaria,
    disciplina.id_professor,
    disciplina.id_turma,
  ];

  return database.query(query, inserirDisciplina);
}

function deletarDisciplina(id) {
  return database.query("DELETE FROM disciplina WHERE id = $1", [id]);
}

function editarDisciplina(id, disciplina) {
  const valor = Object.values(disciplina);
  const chave = Object.keys(disciplina);
  const editarDisciplina = chave.map(
    (atributo, i) => `${atributo}='${valor[i]}'`
  );
  const query = `UPDATE disciplina SET ${editarDisciplina} WHERE id=${id}`;

  return database.query(query);
}

module.exports = {
  buscarTodasDisciplinas,
  buscarDisciplinaPorID,
  adicionarDisciplina,
  deletarDisciplina,
  editarDisciplina,
};
