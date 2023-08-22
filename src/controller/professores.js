const {
  buscarTodosProfessores,
  deletarProfessor,
  adicionarProfessor,
} = require("../model/professores");

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
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send({ mensagem: "Professor removido com sucesso!" });
    }
  });
};

exports.adicionarProfessor = (req, res) => {
  const professor = req.body;

  adicionarProfessor(professor, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send({ success: "Professor adicionado com sucesso" });
    }
  });
};
