function adicionarProfessor(database, res) {
    const novoProfessor = req.body;
    const query = `INSERT INTO professores(id, matricula, nome, cpf, telefone) VALUES ($1, $2, $3, $4, $5)`;

    database.query(query, [novoProfessor.id, novoProfessor.matricula, novoProfessor.nome, novoProfessor.cpf, novoProfessor.telefone])
    .then(() => {
        res.status(201).send({ message: 'Professor adicionado com sucesso' });
    })
    .catch((erro) => {
        res.status(500).send({ erro: erro });
    });
}

module.exports = {
    adicionarProfessor
}