const { buscarTodasDisciplinas } = require("../model/disciplina");

exports.buscarTodasDisciplinas = (req, res) => {
  buscarTodasDisciplinas((error, results) => {
    if (error) {
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send(results.rows);
    }
  });
};
