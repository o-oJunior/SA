const ProfessorFacade = require('../facades/professor');

const mensagemStatus404 = { error404: 'Professor não foi encontrado!' };

const professorFacade = new ProfessorFacade();

exports.buscarTodosProfessores = async (req, res) => {
  professorFacade.conectarDatabase();
  try {
    const resultados = await professorFacade.buscarTodosProfessores();
    res.status(200).send(resultados);
  } catch (error) {
    res.status(500).send(error);
  }
  professorFacade.desconectarDatabase();
};

exports.deletarProfessor = async (req, res) => {
  professorFacade.conectarDatabase();
  try {
    const id = req.params.id;
    const buscarProfessorPorID = await professorFacade.buscarProfessorPorID(id);
    if (buscarProfessorPorID.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      const resultados = await professorFacade.deletarProfessor(id);
      res.status(200).send(resultados);
    }
  } catch (error) {
    res.status(500).send(error);
  }
  professorFacade.desconectarDatabase();
};

exports.adicionarProfessor = async (req, res) => {
  professorFacade.conectarDatabase();
  try {
    const professor = req.body;
    const resultados = await professorFacade.adicionarProfessor(professor);
    res.status(200).send(resultados);
  } catch (error) {
    res.status(500).send(error);
  }
  professorFacade.desconectarDatabase();
};

exports.editarProfessor = async (req, res) => {
  professorFacade.conectarDatabase();
  try {
    const id = req.params.id;
    const professor = req.body;
    const buscarProfessorPorID = await professorFacade.buscarProfessorPorID(id);
    if (buscarProfessorPorID.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      const resultados = await professorFacade.editarProfessor(id, professor);
      res.status(200).send(resultados);
    }
  } catch (error) {
    res.status(500).send(error);
  }
  professorFacade.desconectarDatabase();
};
