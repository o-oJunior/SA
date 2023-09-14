const ProfessorFacade = require('../facade/professor');

const mensagemStatus404 = { error404: 'Professor não foi encontrado!' };

const professorFacade = new ProfessorFacade();

exports.buscarTodosProfessores = async (req, res) => {
  try {
    professorFacade.conectarDatabase();
    const response = await professorFacade.buscarTodosProfessores();
    res.status(200).send(response);
    professorFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deletarProfessor = async (req, res) => {
  try {
    professorFacade.conectarDatabase();
    const id = req.params.id;
    const buscarProfessorPorID = await professorFacade.buscarProfessorPorID(id);
    if (buscarProfessorPorID.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      const response = await professorFacade.deletarProfessor(id);
      res.status(200).send(response);
    }
    professorFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.adicionarProfessor = async (req, res) => {
  try {
    professorFacade.conectarDatabase();
    const professor = req.body;
    const response = await professorFacade.adicionarProfessor(professor);
    res.status(200).send(response);
    professorFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.editarProfessor = async (req, res) => {
  try {
    professorFacade.conectarDatabase();
    const id = req.params.id;
    const professor = req.body;
    const buscarProfessorPorID = await professorFacade.buscarProfessorPorID(id);
    if (buscarProfessorPorID.length === 0) {
      res.status(404).send(mensagemStatus404);
    } else {
      const response = await professorFacade.editarProfessor(id, professor);
      res.status(200).send(response);
    }
    professorFacade.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};
