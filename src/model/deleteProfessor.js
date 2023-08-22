const database = require('../config/database');

function deletarProfessor(id, callback) {
    const query = "DELETE FROM professores WHERE id = $1;";
    const values = [id];

    database.query(query, values, callback)
}

module.exports = {
    deletarProfessor
}