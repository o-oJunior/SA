const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const mensagemStatus500 = { error500: 'Ocorreu um erro inesperado!' };
class FacadeDias {
  async conectarDatabase() {
    try {
      this.client = new pg.Client(process.env.DATABASE);
      await this.client.connect();
      console.log('Conectado ao ElephantSQL!');
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async buscarTodosDias() {
    try {
      const resultados = await this.client.query('SELECT * FROM dia');
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async desconectarDatabase() {
    this.client.end();
    console.log('Desconectado do ElephantSQL!');
  }
}

module.exports = FacadeDias;
