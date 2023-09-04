const database = require("../config/database");

function buscarTodosDiasDisciplina() {
  const query =
    "SELECT" +
    " " +
    "dia_disciplina.id_disciplina, disc.nome, disc.semestre, dia.dia_semana, turma.codigo, turma.numero_alunos, turma.periodo" +
    " " +
    "FROM dia_disciplina" +
    " " +
    "inner join disciplina as disc on disc.id = dia_disciplina.id_disciplina" +
    " " +
    "inner join turma on turma.id = disc.id_turma" +
    " " +
    "inner join dia on dia.id = dia_disciplina.id_dia";
  return database.query(query);
}

module.exports = { buscarTodosDiasDisciplina };
