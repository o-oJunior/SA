const TurmaFacade = require("../model/turma");

const mensagemStatus404 = { error404: "Turma não foi encontrada!" };

const turmaFacade = new TurmaFacade();

exports.buscarTodasTurmas = async (req, res) => {
  try {
    const response = await turmaFacade.buscarTodasTurmas();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.adicionarTurma = async (req, res) => {
  try {
    const turma = req.body;
    const response =  await turmaFacade.adicionarTurma(turma);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.editarTurma = async (req, res) => {
  try {
    const id = req.params.id;
    const turma = req.body;
    const buscarTurma = await turmaFacade.buscarTurmaPorID(id);
    if (buscarTurma.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      const response =  await turmaFacade.editarTurma(id, turma);
      res.status(200).send( response );
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deletarTurma = async (req, res) => {
  try {
    const id = req.params.id;
    const buscarTurma = await turmaFacade.buscarTurmaPorID(id);
    if (buscarTurma.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      const response = await turmaFacade.deletarTurma(id);
      res.status(200).send( response );
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};
