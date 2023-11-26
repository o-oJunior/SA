const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const mensagemStatus500 = { error500: 'Ocorreu um erro inesperado!' };

class ProfessorFacade {
  async conectarDatabase() {
    try {
      this.client = new pg.Client(process.env.DATABASE);
      await this.client.connect();
      console.log('Conectado ao ElephantSQL!');
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async buscarTodosProfessores() {
    try {
      const resultados = await this.client.query('SELECT * FROM professor');
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async buscarProfessorPorID(id) {
    try {
      const resultados = await this.client.query('SELECT * FROM professor WHERE id = $1', [id]);
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async deletarProfessor(id) {
    try {
      await this.client.query('DELETE FROM professor WHERE id = $1', [id]);
      return { success: 'Professor deletado com sucesso!' };
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async adicionarProfessor(professor) {
    try {
      const query = 'INSERT INTO professor(matricula, nome, cpf, telefone) VALUES ($1, $2, $3, $4)';
      const adicionarProfessor = [professor.matricula, professor.nome, professor.cpf, professor.telefone];
      await this.client.query(query, adicionarProfessor);
      return { success: 'Professor adicionado com sucesso!' };
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async editarProfessor(id, professor) {
    try {
      const valor = Object.values(professor);
      const chave = Object.keys(professor);
      const editarProfessor = chave.map((atributo, i) => `${atributo}='${valor[i]}'`);
      const query = `UPDATE professor SET ${editarProfessor} WHERE id=${id}`;

      await this.client.query(query);
      return { success: 'Professor editado com sucesso!' };
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async desconectarDatabase() {
    this.client.end();
    console.log('Desconectado do ElephantSQL!');
  }
}

module.exports = ProfessorFacade;
