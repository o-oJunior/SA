const {
  buscarTodasDisciplinas,
  deletarDisciplina,
  adicionarDisciplina,
  editarDisciplina,
} = require("../model/disciplina");

exports.buscarTodasDisciplinas = async (req, res) => {
  try {
    const response = await buscarTodasDisciplinas();
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};

exports.adicionarDisciplina = async (req, res) => {
  try {
    const disciplina = req.body;
    await adicionarDisciplina(disciplina);
    res.status(201).send({ success: "Disciplina adicionada com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};

exports.deletarDisciplina = async (req, res) => {
  try {
    const id = req.params.id;
    await deletarDisciplina(id);
    res.status(200).send({ success: "Disciplina removida com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};

exports.editarDisciplina = async (req, res) => {
  try {
    const id = req.params.id;
    const disciplina = req.body;
    await editarDisciplina(id, disciplina);
    res.status(200).send({ success: "Disciplina editada com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};
