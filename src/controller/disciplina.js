const {
  buscarTodasDisciplinas,
  adicionarDisciplina,
  editarDisciplina,
  buscarDisciplinaPorNomeETurma,
  buscarDisciplinaPorNomeETurmaEDia,
  buscarDisciplinaPorProfessorEDia,
  editarCargaHorariaDisciplina,
  buscarDisciplinaPorTodasColunas,
  deletarDiaDisciplina,
  deletarTurmaDisciplina,
  buscarDisciplinaPorProfessor,
  buscarDisciplinaPorNome,
  buscarDisciplinaPorTurma,
} = require('../facade/disciplina');

const mensagemStatus404 = { error404: 'Disciplina não encontrada!' };
const mensagemStatus500 = { error500: 'Ocorreu um erro inesperado!' };

exports.buscarTodasDisciplinas = async (req, res) => {
  try {
    const response = await buscarTodasDisciplinas();
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.buscarDisciplinaPorProfessor = async (req, res) => {
  try {
    const idProfessor = req.params.idProfessor;
    const response = await buscarDisciplinaPorProfessor(idProfessor);
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.buscarDisciplinaPorNome = async (req, res) => {
  try {
    const nomeDisciplina = req.params.nomeDisciplina;
    const response = await buscarDisciplinaPorNome(nomeDisciplina);
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.buscarDisciplinaPorTurma = async (req, res) => {
  try {
    const idTurma = req.params.idTurma;
    const response = await buscarDisciplinaPorTurma(idTurma);
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.buscarDisciplinaPorNomeETurma = async (req, res) => {
  try {
    const nomeDisciplina = req.params.nomeDisciplina;
    const idTurma = req.params.idTurma;
    const results = await buscarDisciplinaPorNomeETurma(nomeDisciplina, idTurma);
    res.status(200).send(results.rows);
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.adicionarDisciplina = async (req, res) => {
  try {
    const disciplina = req.body;
    const { nome, idProfessor, idTurma, idDia } = disciplina;
    const buscarDisciplina = await buscarDisciplinaPorNomeETurmaEDia(nome, idTurma, idDia);
    const verificarProfessorEDia = await buscarDisciplinaPorProfessorEDia(idProfessor, idDia);
    if (buscarDisciplina.rows.length > 0) {
      res.status(400).send({ error400: 'Essa turma já está cadastrada nessa disciplina e no mesmo dia!' });
    } else if (verificarProfessorEDia.rows.length > 0) {
      res.status(400).send({ error400: 'Professor já está ocupado nesse dia!' });
    } else {
      await adicionarDisciplina(disciplina);
      res.status(201).send({ success: 'Disciplina adicionada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.deletarTurmaDisciplina = async (req, res) => {
  try {
    const nomeDisciplina = req.params.nomeDisciplina;
    const idTurma = req.params.idTurma;
    const buscarDisciplina = await buscarDisciplinaPorNomeETurma(nomeDisciplina, idTurma);
    if (buscarDisciplina.rows.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      await deletarTurmaDisciplina(nomeDisciplina, idTurma);
      res.status(200).send({ success: 'Turma removida da disciplina com sucesso!' });
    }
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.deletarDiaDisciplina = async (req, res) => {
  try {
    const nomeDisciplina = req.params.nomeDisciplina;
    const idTurma = req.params.idTurma;
    const idDia = req.params.idDia;
    const buscarDisciplina = await buscarDisciplinaPorNomeETurmaEDia(nomeDisciplina, idTurma, idDia);
    if (buscarDisciplina.rows.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      await deletarDiaDisciplina(nomeDisciplina, idTurma, idDia);
      res.status(200).send({ success: 'Dia removido com sucesso!' });
    }
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.editarDisciplina = async (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    const disciplina = {
      nome: body.nomeDisciplina,
      semestre: body.semestre,
      carga_horaria: body.cargaHoraria,
      id_professor: body.idProfessor,
      id_turma: body.idTurma,
      id_dia: body.idDia,
    };
    const atributoObjeto = Object.keys(disciplina);
    atributoObjeto.forEach((atributo) => disciplina[atributo] == undefined && delete disciplina[atributo]);
    const buscarDisciplina = await buscarDisciplinaPorTodasColunas(params);
    const buscarProfessorEDia =
      disciplina.id_professor && disciplina.id_dia
        ? await buscarDisciplinaPorProfessorEDia(disciplina.id_professor, disciplina.id_dia)
        : null;

    const verificarAlteracoes = buscarProfessorEDia.rows.filter(
      (element) => element.id_professor === disciplina.id_professor && element.id_dia === disciplina.id_dia
    );
    if (buscarDisciplina.rows.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else if (buscarProfessorEDia.rows.length > 0 && verificarAlteracoes.length === 0) {
      res.status(400).send({ error400: 'Professor indisponivel! Já está inserido nesse mesmo dia!' });
    } else {
      await editarDisciplina(params, disciplina);
      disciplina.carga_horaria
        ? await editarCargaHorariaDisciplina(params.nome, params.id_turma, disciplina.carga_horaria)
        : null;
      res.status(200).send({ success: 'Disciplina editada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};
