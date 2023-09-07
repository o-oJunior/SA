const {
  buscarTodosProfessores,
  deletarProfessor,
  adicionarProfessor,
  editarProfessor,
  buscarProfessorPorID,
} = require("../model/professor");

const mensagemStatus500 = { error500: "Ocorreu um erro inesperado!" };
const mensagemStatus404 = { error404: "Professor não foi encontrado!" };

exports.buscarTodosProfessores = async (req, res) => {
  try {
    const response = await buscarTodosProfessores();
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.deletarProfessor = async (req, res) => {
  try {
    const id = req.params.id;
    const buscarProfessor = await buscarProfessorPorID(id);
    if (buscarProfessor.rows.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      await deletarProfessor(id);
      res.status(200).send({ success: "Professor excluido com sucesso!" });
    }
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.adicionarProfessor = async (req, res) => {
  try {
    const professor = req.body;
    await adicionarProfessor(professor);
    res.status(200).send({ success: "Professor adicionado com sucesso!" });
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};

exports.editarProfessor = async (req, res) => {
  try {
    const id = req.params.id;
    const professor = req.body;
    const buscarProfessor = await buscarProfessorPorID(id);
    if (buscarProfessor.rows.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      await editarProfessor(id, professor);
      res.status(200).send({ success: "Professor editado com sucesso!" });
    }
  } catch (error) {
    res.status(500).send(mensagemStatus500);
  }
};
