const DisciplinaFacade = require('../facade/disciplina');

const disciplinaFacade = new DisciplinaFacade();

const mensagemStatus404 = { error404: 'Disciplina não encontrada!' };

exports.buscarTodasDisciplinas = async (req, res) => {
  try {
    disciplinaFacade.conectarDatabase();
    const response = await disciplinaFacade.buscarTodasDisciplinas();
    res.status(200).send(response);
    disciplinaFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.buscarDisciplinaPorProfessor = async (req, res) => {
  try {
    disciplinaFacade.conectarDatabase();
    const idProfessor = req.params.idProfessor;
    const response = await disciplinaFacade.buscarDisciplinaPorProfessor(idProfessor);
    res.status(200).send(response);
    disciplinaFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.buscarDisciplinaPorNome = async (req, res) => {
  try {
    disciplinaFacade.conectarDatabase();
    console.log(req.query);
    const nomeDisciplina = req.params.nomeDisciplina;
    const response = await disciplinaFacade.buscarDisciplinaPorNome(nomeDisciplina);
    res.status(200).send(response);
    disciplinaFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.buscarDisciplinaPorTurma = async (req, res) => {
  try {
    disciplinaFacade.conectarDatabase();
    const idTurma = req.params.idTurma;
    const response = await disciplinaFacade.buscarDisciplinaPorTurma(idTurma);
    res.status(200).send(response);
    disciplinaFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.buscarDisciplinaPorNomeETurma = async (req, res) => {
  try {
    disciplinaFacade.conectarDatabase();
    const nomeDisciplina = req.params.nomeDisciplina;
    const idTurma = req.params.idTurma;
    const response = await disciplinaFacade.buscarDisciplinaPorNomeETurma(nomeDisciplina, idTurma);
    res.status(200).send(response);
    disciplinaFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.adicionarDisciplina = async (req, res) => {
  try {
    disciplinaFacade.conectarDatabase();
    const disciplina = req.body;
    const { nome, idProfessor, idTurma, idDia } = disciplina;
    const buscarDisciplina = await disciplinaFacade.buscarDisciplinaPorNomeETurmaEDia(nome, idTurma, idDia);
    const verificarProfessorEDia = await disciplinaFacade.buscarDisciplinaPorProfessorEDia(
      idProfessor,
      idDia
    );
    if (buscarDisciplina.length > 0) {
      res.status(400).send({ error400: 'Essa turma já está cadastrada nessa disciplina e no mesmo dia!' });
    } else if (verificarProfessorEDia.length > 0) {
      res.status(400).send({ error400: 'Professor já está ocupado nesse dia!' });
    } else {
      const response = await disciplinaFacade.adicionarDisciplina(disciplina);
      res.status(201).send(response);
    }
    disciplinaFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deletarTurmaDisciplina = async (req, res) => {
  try {
    disciplinaFacade.conectarDatabase();
    const nomeDisciplina = req.params.nomeDisciplina;
    const idTurma = req.params.idTurma;
    const buscarDisciplina = await disciplinaFacade.buscarDisciplinaPorNomeETurma(nomeDisciplina, idTurma);
    if (buscarDisciplina.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      await disciplinaFacade.deletarTurmaDisciplina(nomeDisciplina, idTurma);
      res.status(200).send({ success: 'Turma removida da disciplina com sucesso!' });
    }
    disciplinaFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deletarDiaDisciplina = async (req, res) => {
  try {
    disciplinaFacade.conectarDatabase();
    const nomeDisciplina = req.params.nomeDisciplina;
    const idTurma = req.params.idTurma;
    const idDia = req.params.idDia;
    const buscarDisciplina = await disciplinaFacade.buscarDisciplinaPorNomeETurmaEDia(
      nomeDisciplina,
      idTurma,
      idDia
    );
    if (buscarDisciplina.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      await disciplinaFacade.deletarDiaDisciplina(nomeDisciplina, idTurma, idDia);
      res.status(200).send({ success: 'Dia removido com sucesso!' });
    }
    disciplinaFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.editarDisciplina = async (req, res) => {
  try {
    disciplinaFacade.conectarDatabase();
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
    const buscarDisciplina = await disciplinaFacade.buscarDisciplinaPorTodasColunas(params);
    const buscarProfessorEDia = [];
    if (disciplina.id_professor && disciplina.id_dia) {
      const resposta = await disciplinaFacade.buscarDisciplinaPorProfessorEDia(
        disciplina.id_professor,
        disciplina.id_dia
      );
      buscarProfessorEDia.push(resposta);
    }

    const verificarAlteracoes = buscarDisciplina.filter(
      (element) => element.id_professor === disciplina.id_professor && element.id_dia === disciplina.id_dia
    );

    if (buscarDisciplina.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else if (buscarProfessorEDia.length > 0 && verificarAlteracoes.length === 0) {
      res.status(400).send({ error400: 'Professor indisponivel! Já está inserido nesse mesmo dia!' });
    } else {
      await disciplinaFacade.editarDisciplina(params, disciplina);
      if (disciplina.carga_horaria) {
        await disciplinaFacade.editarCargaHorariaDisciplina(
          params.nome,
          params.id_turma,
          disciplina.carga_horaria
        );
      }
      res.status(200).send({ success: 'Disciplina editada com sucesso!' });
    }
    disciplinaFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};
