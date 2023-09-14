const {
  buscarTodasTurmas,
  deletarTurma,
  adicionarTurma,
  editarTurma,
  buscarTurmaPorID,
} = require('../facade/turma');

const mensagemStatus404 = { error404: 'Turma não foi encontrada!' };
const mensagemStatus500 = { error500: 'Ocorreu um erro inesperado!' };

exports.buscarTodasTurmas = async (req, res) => {
  try {
    const response = await buscarTodasTurmas();
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.adicionarTurma = async (req, res) => {
  try {
    const turma = req.body;
    await adicionarTurma(turma);
    res.status(201).send({ success: 'Turma adicionada com sucesso!' });
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.editarTurma = async (req, res) => {
  try {
    const id = req.params.id;
    const turma = req.body;
    const buscarTurma = await buscarTurmaPorID(id);
    if (buscarTurma.rows.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      await editarTurma(id, turma);
      res.status(200).send({ success: 'Turma editada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.deletarTurma = async (req, res) => {
  try {
    const id = req.params.id;
    const buscarTurma = await buscarTurmaPorID(id);
    if (buscarTurma.rows.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      await deletarTurma(turmaId);
      res.status(200).send({ success: 'Turma removida com sucesso!' });
    }
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};
