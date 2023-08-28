const database = require("../config/database");

function buscarTodasDisciplinas(callback) {
  database.query("SELECT * FROM disciplina", callback);
}

function adicionarDisciplina(disciplina, callback) {
  const query =
    "INSERT INTO disciplina(nome, semestre, dias, carga_horaria, id_professor, id_turma) VALUES ($1, $2, $3, $4, $5, $6)";
  const inserirDisciplina = [
    disciplina.nome,
    disciplina.semestre,
    disciplina.dias,
    disciplina.carga_horaria,
    disciplina.id_professor,
    disciplina.id_turma,
  ];

  database.query(query, inserirDisciplina, callback);
}

function deletarDisciplina(id, callback) {
  database.query("DELETE FROM disciplina WHERE id = $1", [id], callback);
}

function editarDisciplina(id, disciplina, callback) {
  const valor = Object.values(disciplina);
  const chave = Object.keys(disciplina);
  const editarDisciplina = chave.map((atributo, i) => `${atributo}='${valor[i]}'`);
  const query = `UPDATE disciplina SET ${editarDisciplina} WHERE id=${id}`;

  database.query(query, callback);
}

module.exports = {
  buscarTodasDisciplinas,
  adicionarDisciplina,
  deletarDisciplina,
  editarDisciplina
};
