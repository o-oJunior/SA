const {
  buscarTodasTurmas,
  deletarTurma,
  adicionarTurma,
  editarTurma,
} = require("../model/turma");

exports.buscarTodasTurmas = async (req, res) => {
  try {
    const response = await buscarTodasTurmas();
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};

exports.adicionarTurma = async (req, res) => {
  try {
    const turma = req.body;
    await adicionarTurma(turma);
    res.status(201).send({ success: "Turma adicionada com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};

exports.editarTurma = async (req, res) => {
  try {
    const id = req.params.id;
    const turma = req.body;
    await editarTurma(id, turma);
    res.status(200).send({ success: "Turma editada com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};

exports.deletarTurma = async (req, res) => {
  try {
    const turmaId = req.params.id;
    await deletarTurma(turmaId);
    res.status(200).send({ success: "Turma removida com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};
