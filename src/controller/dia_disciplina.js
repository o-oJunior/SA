const { buscarTodosDiasDisciplina } = require("../model/dia_disciplina");

exports.buscarTodosDiasDisciplina = async (req, res) => {
  try {
    const results = await buscarTodosDiasDisciplina();
    res.status(200).send(results.rows);
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};
