function buscarTodosProfessores(database, res) {
    database.query('SELECT * FROM professores').then(
        (resultado) => {
            res.status(200).send({ professores: resultado.rows });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    );
const database = require('../config/database');

function buscarTodosProfessores(callback) {
    database.query('SELECT * FROM professores', callback)
}

module.exports = {
    buscarTodosProfessores
}