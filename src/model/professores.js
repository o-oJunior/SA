const database = require("../config/database");

class ProfessoresModel {
    constructor() {
        this.connection = database
    }

    getTodosProfessores(callback) {
        this.connection.query("SELECT * FROM professores", callback)
    }
}

module.exports = ProfessoresModel