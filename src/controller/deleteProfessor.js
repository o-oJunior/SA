const { deletarProfessor } = require('../model/deleteProfessor');

exports.deletarProfessor = (req, res) => {
    const professorId = req.params.id;

    deletarProfessor(professorId, (error) => {
        if(error) {
            res.status(500).send({error: error});
        } else {
            res.status(200).send({mensagem: "Professor removido com sucesso!"});
        }
    });
}