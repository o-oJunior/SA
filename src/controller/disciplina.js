const {
  buscarTodasDisciplinas,
  deletarDisciplina,
} = require("../model/disciplina");

exports.buscarTodasDisciplinas = (req, res) => {
  buscarTodasDisciplinas((error, results) => {
    if (error) {
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send(results.rows);
    }
  });
};

exports.deletarDisciplina = (req, res) => {
  const id = req.params.id;
  deletarDisciplina(id, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send({ success: "Disciplina excluida com sucesso!" });
    }
  });
};
