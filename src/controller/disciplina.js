const {
  buscarTodasDisciplinas,
  deletarDisciplina,
  adicionarDisciplina,
  editarDisciplina
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

exports.adicionarDisciplina = (req, res) => {
  const disciplina = req.body;

  adicionarDisciplina(disciplina, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(201).send({ success: "Disciplina adicionada com sucesso!" });
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

exports.editarDisciplina = (req, res) => {
  const id = req.params.id;
  const disciplina = req.body;

  editarDisciplina(id, disciplina, (error, results) => {
    if(error) {
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send({ success: "Disciplina editada com sucesso!" })
    }
  });
}
