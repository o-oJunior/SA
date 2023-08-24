const { buscarTodasTurmas } = require("../model/turma");

exports.buscarTodasTurmas= (req, res) => {
  buscarTodasTurmas((error, results) => {
    if (error) {
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send(results);
    }
  });
}
