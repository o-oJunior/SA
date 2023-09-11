const database = require('../config/database');

const query = `SELECT disciplina.nome AS nome_disciplina, disciplina.semestre, disciplina.carga_horaria,
  disciplina.id_professor, professor.nome AS nome_professor, disciplina.id_turma, turma.codigo AS codigo_turma,
  turma.numero_alunos, turma.turno, dia.id as id_dia, dia.dia_semana
  FROM disciplina
  INNER JOIN turma ON turma.id = disciplina.id_turma
  INNER JOIN professor ON professor.id = disciplina.id_professor
  INNER JOIN dia ON dia.id = disciplina.id_dia`;

function buscarTodasDisciplinas() {
  const queryAll = `SELECT disciplina.nome AS nome_disciplina, disciplina.semestre, disciplina.carga_horaria,
  disciplina.id_turma, turma.codigo AS codigo_turma, turma.numero_alunos, turma.turno
  FROM disciplina INNER JOIN turma ON turma.id = disciplina.id_turma
  GROUP BY nome_disciplina, disciplina.semestre, disciplina.carga_horaria, disciplina.id_turma,
  codigo_turma, turma.numero_alunos, turma.turno`;
  return database.query(queryAll);
}

function buscarDisciplinaPorProfessor(idProfessor) {
  const queryDisciplina = `${query} WHERE disciplina.id_professor = $1`;
  const value = [idProfessor];
  return database.query(queryDisciplina, value);
}

function buscarDisciplinaPorNome(nomeDisciplina) {
  const queryDisciplina = `${query} WHERE disciplina.nome = $1`;
  const value = [nomeDisciplina];
  return database.query(queryDisciplina, value);
}

function buscarDisciplinaPorTurma(idTurma) {
  const queryDisciplina = `${query} WHERE disciplina.id_turma = $1`;
  const value = [idTurma];
  return database.query(queryDisciplina, value);
}

function buscarDisciplinaPorTodasColunas(params) {
  const queryDisciplina = `SELECT * FROM disciplina
   WHERE nome = $1 AND semestre = $2 AND carga_horaria = $3 AND id_professor = $4 AND id_turma = $5 AND id_dia = $6`;
  const values = [
    params.nome,
    params.semestre,
    params.carga_horaria,
    params.id_professor,
    params.id_turma,
    params.id_dia,
  ];
  return database.query(queryDisciplina, values);
}

function buscarDisciplinaPorNomeETurma(nomeDisciplina, idTurma) {
  const queryDisciplina = `${query} WHERE disciplina.nome = $1 AND disciplina.id_turma = $2`;
  const values = [nomeDisciplina, idTurma];
  return database.query(queryDisciplina, values);
}

function buscarDisciplinaPorProfessorEDia(idProfessor, idDia) {
  const queryDisciplina = `SELECT disciplina.nome AS nome_disciplina, disciplina.semestre, disciplina.carga_horaria,
  disciplina.id_professor, professor.nome AS nome_professor, disciplina.id_turma, disciplina.id_dia FROM disciplina
  INNER JOIN professor ON professor.id = disciplina.id_professor 
  WHERE id_professor = $1 AND id_dia = $2;`;
  const values = [idProfessor, idDia];
  return database.query(queryDisciplina, values);
}

function buscarDisciplinaPorNomeETurmaEDia(nomeDisciplina, idTurma, idDia) {
  const queryDisciplina = `${query} WHERE disciplina.nome = $1 AND disciplina.id_turma = $2 AND disciplina.id_dia = $3`;
  const values = [nomeDisciplina, idTurma, idDia];
  return database.query(queryDisciplina, values);
}

function adicionarDisciplina(disciplina) {
  const insert =
    'INSERT INTO disciplina(nome, semestre, carga_horaria, id_professor, id_turma, id_dia) VALUES ($1, $2, $3, $4, $5, $6)';
  const inserirDisciplina = [
    disciplina.nome,
    disciplina.semestre,
    disciplina.cargaHoraria,
    disciplina.idProfessor,
    disciplina.idTurma,
    disciplina.idDia,
  ];

  return database.query(insert, inserirDisciplina);
}

function deletarTurmaDisciplina(nome, idTurma) {
  const deletar = 'DELETE FROM disciplina WHERE nome = $1 AND id_turma = $2';
  const values = [nome.replace('&', ' '), idTurma];
  return database.query(deletar, values);
}

function deletarDiaDisciplina(nome, idTurma, idDia) {
  const deletar = 'DELETE FROM disciplina WHERE nome = $1 AND id_turma = $2 AND id_dia = $3';
  const values = [nome.replace('&', ' '), idTurma, idDia];
  return database.query(deletar, values);
}

function editarDisciplina(params, disciplina) {
  const valor = Object.values(disciplina);
  const chave = Object.keys(disciplina);
  const editarDisciplina = chave.map((atributo, i) => `${atributo}='${valor[i]}'`);
  const update = `UPDATE disciplina SET ${editarDisciplina} 
  WHERE nome = $1 AND semestre = $2 AND carga_horaria = $3 AND id_professor = $4 AND id_turma = $5 AND id_dia = $6`;
  const values = [
    params.nome.replace('&', ' '),
    params.semestre,
    params.carga_horaria,
    params.id_professor,
    params.id_turma,
    params.id_dia,
  ];
  return database.query(update, values);
}

function editarCargaHorariaDisciplina(nomeDisciplina, idTurma, cargaHoraria) {
  const update = 'UPDATE disciplina SET carga_horaria = $1 WHERE nome = $2 AND id_turma = $3';
  const values = [cargaHoraria, nomeDisciplina.replace('&', ' '), idTurma];
  return database.query(update, values);
}

module.exports = {
  buscarTodasDisciplinas,
  buscarDisciplinaPorProfessor,
  buscarDisciplinaPorNome,
  buscarDisciplinaPorTurma,
  buscarDisciplinaPorTodasColunas,
  buscarDisciplinaPorNomeETurma,
  buscarDisciplinaPorProfessorEDia,
  buscarDisciplinaPorNomeETurmaEDia,
  adicionarDisciplina,
  deletarTurmaDisciplina,
  deletarDiaDisciplina,
  editarDisciplina,
  editarCargaHorariaDisciplina,
};
