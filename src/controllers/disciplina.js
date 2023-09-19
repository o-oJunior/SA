const DisciplinaFacade = require('../facades/disciplina');

const disciplinaFacade = new DisciplinaFacade();

const mensagemStatus404 = { error404: 'Disciplina não encontrada!' };

function formatarResultados(array) {
  const resultados = array.map((item) => {
    const novoObjeto = {
      nomeDisciplina: item.nome_disciplina,
      semestre: item.semestre,
      cargaHoraria: item.carga_horaria,
      idProfessor: item.id_professor,
      nomeProfessor: item.nome_professor,
      idTurma: item.id_turma,
      codigoTurma: item.codigo_turma,
      numeroAlunos: item.numero_alunos,
      turno: item.turno,
      idDia: item.id_dia,
      diaSemana: item.dia_semana,
    };
    return novoObjeto;
  });

  return resultados;
}

exports.buscarTodasDisciplinas = async (req, res) => {
  disciplinaFacade.conectarDatabase();
  try {
    const resultados = await disciplinaFacade.buscarTodasDisciplinas();
    const formatarResultados = [];
    resultados.forEach((resultado) => {
      const novoObjeto = {
        nomeDisciplina: resultado.nome_disciplina,
        semestre: resultado.semestre,
        cargaHoraria: resultado.carga_horaria,
        idTurma: resultado.id_turma,
        codigoTurma: resultado.codigo_turma,
        numeroAlunos: resultado.numero_alunos,
        turno: resultado.turno,
      };
      formatarResultados.push(novoObjeto);
    });
    res.status(200).send(formatarResultados);
  } catch (error) {
    res.status(500).send(error);
  }
  disciplinaFacade.desconectarDatabase();
};

exports.buscarDisciplinaPorProfessor = async (req, res) => {
  disciplinaFacade.conectarDatabase();
  try {
    const idProfessor = req.params.idProfessor;
    const buscarResultados = await disciplinaFacade.buscarDisciplinaPorProfessor(idProfessor);
    const resultados = await formatarResultados(buscarResultados);
    res.status(200).send(resultados);
  } catch (error) {
    res.status(500).send(error);
  }
  disciplinaFacade.desconectarDatabase();
};

exports.buscarDisciplinaPorNome = async (req, res) => {
  disciplinaFacade.conectarDatabase();
  try {
    const nomeDisciplina = req.params.nomeDisciplina;
    const buscarResultados = await disciplinaFacade.buscarDisciplinaPorNome(nomeDisciplina);
    const resultados = await formatarResultados(buscarResultados);
    res.status(200).send(resultados);
  } catch (error) {
    res.status(500).send(error);
  }
  disciplinaFacade.desconectarDatabase();
};

exports.buscarDisciplinaPorTurma = async (req, res) => {
  disciplinaFacade.conectarDatabase();
  try {
    const idTurma = req.params.idTurma;
    const buscarResultados = await disciplinaFacade.buscarDisciplinaPorTurma(idTurma);
    const resultados = await formatarResultados(buscarResultados);
    res.status(200).send(resultados);
  } catch (error) {
    res.status(500).send(error);
  }
  disciplinaFacade.desconectarDatabase();
};

exports.buscarDisciplinaPorNomeETurma = async (req, res) => {
  disciplinaFacade.conectarDatabase();
  try {
    const nomeDisciplina = req.params.nomeDisciplina;
    const idTurma = req.params.idTurma;
    const buscarResultados = await disciplinaFacade.buscarDisciplinaPorNomeETurma(nomeDisciplina, idTurma);
    const resultados = await formatarResultados(buscarResultados);
    res.status(200).send(resultados);
  } catch (error) {
    res.status(500).send(error);
  }
  disciplinaFacade.desconectarDatabase();
};

exports.adicionarDisciplina = async (req, res) => {
  disciplinaFacade.conectarDatabase();
  try {
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
      const resultados = await disciplinaFacade.adicionarDisciplina(disciplina);
      res.status(201).send(resultados);
    }
  } catch (error) {
    res.status(500).send(error);
  }
  disciplinaFacade.desconectarDatabase();
};

exports.deletarTurmaDisciplina = async (req, res) => {
  disciplinaFacade.conectarDatabase();
  try {
    const nomeDisciplina = req.params.nomeDisciplina;
    const idTurma = req.params.idTurma;
    const buscarDisciplina = await disciplinaFacade.buscarDisciplinaPorNomeETurma(nomeDisciplina, idTurma);
    if (buscarDisciplina.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      const resultados = await disciplinaFacade.deletarTurmaDisciplina(nomeDisciplina, idTurma);
      res.status(200).send(resultados);
    }
  } catch (error) {
    res.status(500).send(error);
  }
  disciplinaFacade.desconectarDatabase();
};

exports.deletarDiaDisciplina = async (req, res) => {
  disciplinaFacade.conectarDatabase();
  try {
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
      const resultados = await disciplinaFacade.deletarDiaDisciplina(nomeDisciplina, idTurma, idDia);
      res.status(200).send(resultados);
    }
  } catch (error) {
    res.status(500).send(error);
  }
  disciplinaFacade.desconectarDatabase();
};

exports.editarDisciplina = async (req, res) => {
  disciplinaFacade.conectarDatabase();
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
      const resultados = await disciplinaFacade.editarDisciplina(params, disciplina);
      if (disciplina.carga_horaria) {
        await disciplinaFacade.editarCargaHorariaDisciplina(
          params.nome,
          params.id_turma,
          disciplina.carga_horaria
        );
      }
      res.status(200).send(resultados);
    }
  } catch (error) {
    res.status(500).send(error);
  }
  disciplinaFacade.desconectarDatabase();
};
