const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const mensagemStatus500 = { error500: "Ocorreu um erro inesperado!" };

class TurmaFacade {
  constructor() {
    this.connectDatabase();
  }

  async connectDatabase() {
    try {
      this.client = new pg.Client(process.env.DATABASE);
      await this.client.connect();
      console.log('Conectado ao elephantSQL');
    } catch (erro) {
      return mensagemStatus500;
    }
  }

  async buscarTodasTurmas() {
    try {
      const results = await this.client.query('SELECT * FROM turma');
      return results.rows;

    } catch (erro) {
      return mensagemStatus500;
    }
  }

  async buscarTurmaPorID(id) {
    try {
      const results = await this.client.query('SELECT * FROM turma WHERE id = $1', [id]);
      return results.rows;

    } catch(erro) {
      return mensagemStatus500;
    }
  }
  
  async adicionarTurma(turma) {
    try {
      const query = 'INSERT INTO turma(codigo, numero_alunos, turno) VALUES ($1, $2, $3)';
      
      const inserirTurma = [turma.codigo, turma.numero_alunos, turma.turno];
      await this.client.query(query, inserirTurma);
      return { success: 'Turma adicionada com sucesso!'}

    } catch(erro) {
      console.log(erro)
      return mensagemStatus500;
    }
  }
  
  async editarTurma(id, turma) {
    try {

      const valor = Object.values(turma);
      const chave = Object.keys(turma);
      const alterarTurma = chave.map((atributo, i) => `${atributo}='${valor[i]}'`);
      const query = `UPDATE turma SET ${alterarTurma} WHERE id=${id}`;
      
      await this.client.query(query);
      return { success: 'Turma editada com sucesso!'}

    } catch(erro) {
      return mensagemStatus500;
    }
  }
  
  async deletarTurma(id) {
    try {

      const query = 'DELETE FROM turma WHERE id = $1;';
      
     await this.client.query(query, [id]);
     return { success: 'Turma deletada com sucesso!'}
      
    } catch(erro) {
      return mensagemStatus500;
    }
  }
}
  
module.exports = TurmaFacade;
