const {
  buscarTodosProfessores,
  deletarProfessor,
  adicionarProfessor,
  editarProfessor,
} = require("../model/professor");

exports.buscarTodosProfessores = async (req, res) => {
  try {
    const response = await buscarTodosProfessores();
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};

exports.deletarProfessor = async (req, res) => {
  try {
    const professorId = req.params.id;
    await deletarProfessor(professorId);
    res.status(200).send({ success: "Professor excluido com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};

exports.adicionarProfessor = async (req, res) => {
  try {
    const professor = req.body;
    await adicionarProfessor(professor);
    res.status(200).send({ success: "Professor adicionado com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};

exports.editarProfessor = async (req, res) => {
  try {
    const id = req.params.id;
    const professor = req.body;
    await editarProfessor(id, professor);
    res.status(200).send({ success: "Professor editado com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro inesperado!" });
  }
};
