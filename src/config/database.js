const pg = require('pg');
const dotenv = require('dotenv')
dotenv.config()
const database = new pg.Client(process.env.DATABASE);

database.connect((erro) => {
    if(erro) {
        return console.log('Não foi possível se conectar com o ElephantSQL', erro);
    } else {
        return console.log('Conectado ao ElephantSQL!');
    }
});

module.exports = database;
