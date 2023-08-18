const ProfessoresModel = require("../model/professores")

const professorModel = new ProfessoresModel()

class ProfessoresController {
    getTodosProfessores(req, res){
        professorModel.getTodosProfessores((error, results) => {
            if(error){
                res.status(500).send({error: 'Ocorreu um erro inesperado!'})
            } else {
                res.status(200).send(results.rows)
            }
        })        
    }
}

module.exports = ProfessoresController