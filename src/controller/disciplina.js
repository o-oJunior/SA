const {
  buscarTodasDisciplinas,
  deletarDisciplina,
  adicionarDisciplina,
  editarDisciplina,
  buscarDisciplinaPorID,
} = require("../model/disciplina");

const mensagemStatus404 = { error404: "Disciplina não encontrada!" };
const mensagemStatus500 = { error500: "Ocorreu um erro inesperado!" };

exports.buscarTodasDisciplinas = async (req, res) => {
  try {
    const response = await buscarTodasDisciplinas();
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.adicionarDisciplina = async (req, res) => {
  try {
    const disciplina = req.body;
    await adicionarDisciplina(disciplina);
    res.status(201).send({ success: "Disciplina adicionada com sucesso!" });
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.deletarDisciplina = async (req, res) => {
  try {
    const id = req.params.id;
    const buscarDisciplina = await buscarDisciplinaPorID(id);
    if (buscarDisciplina.rows.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      await deletarDisciplina(id);
      res.status(200).send({ success: "Disciplina removida com sucesso!" });
    }
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.editarDisciplina = async (req, res) => {
  try {
    const id = req.params.id;
    const disciplina = req.body;
    const buscarDisciplina = await buscarDisciplinaPorID(id);
    if (buscarDisciplina.rows.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      await editarDisciplina(id, disciplina);
      res.status(200).send({ success: "Disciplina editada com sucesso!" });
    }
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};
