const {
  buscarTodasTurmas,
  deletarTurma,
  adicionarTurma,
  editarTurma,
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
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(201).send({ success: "Turma adicionada com sucesso!" });
    }
  });
};

exports.editarTurma = (req, res) => {
  const id = req.params.id
  const turma = req.body

  editarTurma(id, turma, (error, results) => {
    if(error){
      res.status(500).send({ error: "Ocorreu um erro inesperado!" });
    } else {
      res.status(200).send({ success: "Turma editada com sucesso!" });
    }
  })
}

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
