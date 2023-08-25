const {
  buscarTodasTurmas,
  deletarTurma,
  adicionarTurma,
} = require("../model/turma");

exports.buscarTodasTurmas = (req, res) => {
  buscarTodasTurmas((error, results) => {
    if (error) {
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send(results.rows);
    }
  });
};

exports.adicionarTurma = (req, res) => {
  const turma = req.body;
  adicionarTurma(turma, (error, results) => {
    if (error) {
      res.status(500).send({ erro: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send({ success: "Turma adicionada com sucesso!" });
    }
  });
};

exports.deletarTurma = (req, res) => {
  const turmaId = req.params.id;

  deletarTurma(turmaId, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send({ success: "Turma removida com sucesso!" });
    }
  });
};
