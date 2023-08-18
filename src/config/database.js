const pg = require('pg');
const database = new pg.Client('postgres://spdsazvx:Sm_ArqpUJahgYwZoOW7-UzEDuEhkovPk@silly.db.elephantsql.com/spdsazvx');

database.connect((erro) => {
    if(erro) {
        return console.log('Não foi possível se conectar com o ElephantSQL', erro);
    } else {
        return console.log('Conectado ao ElephantSQL!');
    }
});

module.exports = database;