const database = require('../config/database');

function buscarTodasTurmas() {
  return database.query('SELECT * FROM turma');
}

function buscarTurmaPorID(id) {
  return database.query('SELECT * FROM turma WHERE id = $1', [id]);
}

function adicionarTurma(turma) {
  const query = 'INSERT INTO turma(codigo, numero_alunos, turno) VALUES ($1, $2, $3)';

  const inserirTurma = [turma.codigo, turma.numero_alunos, turma.turno];
  return database.query(query, inserirTurma);
}

function editarTurma(id, turma) {
  const valor = Object.values(turma);
  const chave = Object.keys(turma);
  const alterarTurma = chave.map((atributo, i) => `${atributo}='${valor[i]}'`);
  const query = `UPDATE turma SET ${alterarTurma} WHERE id=${id}`;

  return database.query(query);
}

function deletarTurma(id) {
  const query = 'DELETE FROM turma WHERE id = $1;';

  return database.query(query, [id]);
}

module.exports = {
  buscarTodasTurmas,
  buscarTurmaPorID,
  deletarTurma,
  adicionarTurma,
  editarTurma,
};
