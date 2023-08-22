const database = require('../config/database');
const { deletarProfessor } = require('../model/deleteProfessor');

exports.deletarProfessor = (req, res) => {
    deletarProfessor(database, req, res);
}