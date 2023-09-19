const TurmaFacade = require('../facades/turma');

const mensagemStatus404 = { error404: 'Turma não foi encontrada!' };

const turmaFacade = new TurmaFacade();

exports.buscarTodasTurmas = async (req, res) => {
  turmaFacade.conectarDatabase();
  try {
    const resultados = await turmaFacade.buscarTodasTurmas();
    const formatarResultados = [];
    resultados.forEach((resultado) =>
      formatarResultados.push({
        id: resultado.id,
        codigo: resultado.codigo,
        numeroAlunos: resultado.numero_alunos,
        turno: resultado.turno,
      })
    );
    res.status(200).send(formatarResultados);
  } catch (error) {
    res.status(500).send(error);
  }
  turmaFacade.desconectarDatabase();
};

exports.adicionarTurma = async (req, res) => {
  turmaFacade.conectarDatabase();
  try {
    const turma = req.body;
    const response = await turmaFacade.adicionarTurma(turma);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
  turmaFacade.desconectarDatabase();
};

exports.editarTurma = async (req, res) => {
  turmaFacade.conectarDatabase();
  try {
    const id = req.query.id;
    const turma = req.body;
    const buscarTurma = await turmaFacade.buscarTurmaPorID(id);
    if (buscarTurma.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      const response = await turmaFacade.editarTurma(id, turma);
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(500).send(error);
  }
  turmaFacade.desconectarDatabase();
};

exports.deletarTurma = async (req, res) => {
  turmaFacade.conectarDatabase();
  try {
    const id = req.query.id;
    const buscarTurma = await turmaFacade.buscarTurmaPorID(id);
    if (buscarTurma.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      const response = await turmaFacade.deletarTurma(id);
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(500).send(error);
  }
  turmaFacade.desconectarDatabase();
};
