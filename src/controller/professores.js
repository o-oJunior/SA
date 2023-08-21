const database = require('../config/database');
const { buscarTodosProfessores } = require('../model/professores');

exports.buscarTodosProfessores = (req,res) => {
    buscarTodosProfessores(database, res);
}