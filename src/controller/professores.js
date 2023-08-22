const { buscarTodosProfessores, deletarProfessor } = require("../model/professores");

exports.buscarTodosProfessores = (req, res) => {
  buscarTodosProfessores((error, results) => {
    if (error) {
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send(results.rows);
    }
  });
};

exports.deletarProfessor = (req, res) => {
  const professorId = req.params.id;

  deletarProfessor(professorId, (error) => {
    if (error) {
      res.status(500).send({ error: error });
    } else {
      res.status(200).send({ mensagem: "Professor removido com sucesso!" });
    }
  });
};
