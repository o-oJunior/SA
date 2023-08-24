const { buscarTodasTurmas, deletarTurma } = require("../model/turma");

exports.buscarTodasTurmas = (req, res) => {
  buscarTodasTurmas((error, results) => {
    if (error) {
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send(results.rows);
    }
  });
}

exports.deletarTurma = (req, res) => {
  const turmaId = req.params.id;

  deletarTurma(turmaId, (error, results) => {
    if (error) {
      res.status(500).send({ error: error });
    } else {
      res.status(200).send({ success: "Turma removida com sucesso!" });
    }
  });
}
