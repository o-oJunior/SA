function buscarTodosProfessores(database, res) {
    database.query('SELECT * FROM professores').then(
        (resultado) => {
            res.status(200).send({ produtos: resultado.rows });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
        }
    );
}

module.exports = {
    buscarTodosProfessores
}