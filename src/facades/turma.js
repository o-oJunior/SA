const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const mensagemStatus500 = { error500: 'Ocorreu um erro inesperado!' };

class TurmaFacade {
  constructor() {
    this.conectarDatabase();
  }

  async conectarDatabase() {
    try {
      this.client = new pg.Client(process.env.DATABASE);
      await this.client.connect();
      console.log('Conectado ao ElephantSQL!');
    } catch (erro) {
      return mensagemStatus500;
    }
  }

  async buscarTodasTurmas() {
    try {
      const resultados = await this.client.query('SELECT * FROM turma');
      return resultados.rows;
    } catch (erro) {
      return mensagemStatus500;
    }
  }

  async buscarTurmaPorID(id) {
    try {
      const resultados = await this.client.query('SELECT * FROM turma WHERE id = $1', [id]);
      return resultados.rows;
    } catch (erro) {
      return mensagemStatus500;
    }
  }

  async adicionarTurma(turma) {
    try {
      const inserir = 'INSERT INTO turma(codigo, numero_alunos, turno) VALUES ($1, $2, $3)';

      const inserirTurma = [turma.codigo, turma.numero_alunos, turma.turno];
      await this.client.query(inserir, inserirTurma);
      return { success: 'Turma adicionada com sucesso!' };
    } catch (erro) {
      return mensagemStatus500;
    }
  }

  async editarTurma(id, turma) {
    try {
      const valor = Object.values(turma);
      const chave = Object.keys(turma);
      const alterarTurma = chave.map((atributo, i) => `${atributo}='${valor[i]}'`);
      const update = `UPDATE turma SET ${alterarTurma} WHERE id=${id}`;

      await this.client.query(update);
      return { success: 'Turma editada com sucesso!' };
    } catch (erro) {
      return mensagemStatus500;
    }
  }

  async deletarTurma(id) {
    try {
      const deletar = 'DELETE FROM turma WHERE id = $1;';

      await this.client.query(deletar, [id]);
      return { success: 'Turma deletada com sucesso!' };
    } catch (erro) {
      return mensagemStatus500;
    }
  }

  async desconectarDatabase() {
    this.client.end();
  }
}

module.exports = TurmaFacade;
