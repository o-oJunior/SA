const database = require('../config/database');
const { adicionarProfessor } = require('../model/adicionarProfessor');

exports.adicionarProfessor = (req,res) => {
    adicionarProfessor(database, res);
}