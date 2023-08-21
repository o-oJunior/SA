const pg = require('pg');
const database = new pg.Client('BANCO DE DADOS');

database.connect((erro) => {
    if(erro) {
        return console.log('Não foi possível se conectar com o ElephantSQL', erro);
    } else {
        return console.log('Conectado ao ElephantSQL!');
    }
});

module.exports = database;
