const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const buscar = `SELECT disciplina.nome AS nome_disciplina, disciplina.semestre, disciplina.carga_horaria,
  disciplina.id_professor, professor.nome AS nome_professor, disciplina.id_turma, turma.codigo AS codigo_turma,
  turma.numero_alunos, turma.turno, dia.id as id_dia, dia.dia_semana
  FROM disciplina INNER JOIN turma ON turma.id = disciplina.id_turma
  INNER JOIN professor ON professor.id = disciplina.id_professor
  INNER JOIN dia ON dia.id = disciplina.id_dia`;

const mensagemStatus500 = { error500: 'Ocorreu um erro inesperado!' };
class DisciplinaFacade {
  async conectarDatabase() {
    try {
      this.client = new pg.Client(process.env.DATABASE);
      await this.client.connect();
      console.log('Conectado ao ElephantSQL!');
    } catch (error) {
      console.log('Erro ao conectar ao banco de dados!');
    }
  }

  async buscarTodasDisciplinas() {
    try {
      const buscarTodasDisciplinas = `SELECT disciplina.nome AS nome_disciplina, disciplina.semestre, disciplina.carga_horaria,
      disciplina.id_turma, turma.codigo AS codigo_turma, turma.numero_alunos, turma.turno
      FROM disciplina INNER JOIN turma ON turma.id = disciplina.id_turma
      GROUP BY nome_disciplina, disciplina.semestre, disciplina.carga_horaria, disciplina.id_turma,
      codigo_turma, turma.numero_alunos, turma.turno`;
      const resultados = await this.client.query(buscarTodasDisciplinas);
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async buscarDisciplinaPorProfessor(idProfessor) {
    try {
      const buscarDisciplina = `${buscar} WHERE disciplina.id_professor = $1`;
      const valor = [idProfessor];
      const resultados = await this.client.query(buscarDisciplina, valor);
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async buscarDisciplinaPorNome(nomeDisciplina) {
    try {
      const buscarDisciplina = `${buscar} WHERE disciplina.nome = $1`;
      const valor = [nomeDisciplina.replace('&', ' ')];
      const resultados = await this.client.query(buscarDisciplina, valor);
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async buscarDisciplinaPorTurma(idTurma) {
    try {
      const buscarDisciplina = `${buscar} WHERE disciplina.id_turma = $1`;
      const valor = [idTurma];
      const resultados = await this.client.query(buscarDisciplina, valor);
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async buscarDisciplinaPorTodasColunas(objeto) {
    try {
      const buscarDisciplina = `SELECT * FROM disciplina
       WHERE nome = $1 AND semestre = $2 AND carga_horaria = $3 AND id_professor = $4 AND id_turma = $5 AND id_dia = $6`;
      const valores = [
        objeto.nome,
        objeto.semestre,
        objeto.carga_horaria,
        objeto.id_professor,
        objeto.id_turma,
        objeto.id_dia,
      ];
      const resultados = await this.client.query(buscarDisciplina, valores);
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async buscarDisciplinaPorNomeETurma(nomeDisciplina, idTurma) {
    try {
      const buscarDisciplina = `${buscar} WHERE disciplina.nome = $1 AND disciplina.id_turma = $2`;
      const valores = [nomeDisciplina, idTurma];
      const resultados = await this.client.query(buscarDisciplina, valores);
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async buscarDisciplinaPorProfessorEDia(idProfessor, idDia) {
    try {
      const buscarDisciplina = `SELECT disciplina.nome AS nome_disciplina, disciplina.semestre, disciplina.carga_horaria,
      disciplina.id_professor, professor.nome AS nome_professor, disciplina.id_turma, disciplina.id_dia FROM disciplina
      INNER JOIN professor ON professor.id = disciplina.id_professor 
      WHERE id_professor = $1 AND id_dia = $2`;
      const valores = [idProfessor, idDia];
      const resultados = await this.client.query(buscarDisciplina, valores);
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async buscarDisciplinaPorNomeETurmaEDia(nomeDisciplina, idTurma, idDia) {
    try {
      const buscarDisciplina = `${buscar} WHERE disciplina.nome = $1 AND disciplina.id_turma = $2 AND disciplina.id_dia = $3`;
      const valores = [nomeDisciplina, idTurma, idDia];
      const resultados = await this.client.query(buscarDisciplina, valores);
      return resultados.rows;
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async adicionarDisciplina(disciplina) {
    try {
      const inserir = `INSERT INTO disciplina(nome, semestre, carga_horaria, id_professor, id_turma, id_dia) VALUES 
      ($1, $2, $3, $4, $5, $6)`;
      const valores = [
        disciplina.nome,
        disciplina.semestre,
        disciplina.cargaHoraria,
        disciplina.idProfessor,
        disciplina.idTurma,
        disciplina.idDia,
      ];
      await this.client.query(inserir, valores);
      return { success: 'Disciplina adicionada com sucesso!' };
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async deletarTurmaDisciplina(nome, idTurma) {
    try {
      const deletar = 'DELETE FROM disciplina WHERE nome = $1 AND id_turma = $2';
      const valores = [nome.replace('%', ' '), idTurma];
      await this.client.query(deletar, valores);
      return { success: 'Turma desvinculada da disciplina com sucesso!' };
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async deletarDiaDisciplina(nome, idTurma, idDia) {
    try {
      const deletar = 'DELETE FROM disciplina WHERE nome = $1 AND id_turma = $2 AND id_dia = $3';
      const valores = [nome.replace('%', ' '), idTurma, idDia];
      await this.client.query(deletar, valores);
      return { success: 'Dia da disciplina removido com sucesso!' };
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async editarDisciplina(objeto, disciplina) {
    try {
      const valor = Object.values(disciplina);
      const chave = Object.keys(disciplina);
      const editarDisciplina = chave.map((atributo, i) => `${atributo}='${valor[i]}'`);
      const atualizar = `UPDATE disciplina SET ${editarDisciplina} WHERE
      nome = $1 AND semestre = $2 AND carga_horaria = $3 AND id_professor = $4 AND id_turma = $5 AND id_dia = $6`;
      const valores = [
        objeto.nome.replace('%', ' '),
        objeto.semestre,
        objeto.carga_horaria,
        objeto.id_professor,
        objeto.id_turma,
        objeto.id_dia,
      ];
      await this.client.query(atualizar, valores);
      return { success: 'Disciplina atualizada com sucesso!' };
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async editarCargaHorariaDisciplina(nomeDisciplina, idTurma, cargaHoraria) {
    try {
      const atualizar = 'UPDATE disciplina SET carga_horaria = $1 WHERE nome = $2 AND id_turma = $3';
      const valores = [cargaHoraria, nomeDisciplina.replace('&', ' '), idTurma];
      await this.client.query(atualizar, valores);
      return { success: 'Carga horaria atualizada com sucesso!' };
    } catch (error) {
      return mensagemStatus500;
    }
  }

  async desconectarDatabase() {
    this.client.end();
    console.log('Desconectado do ElephantSQL!');
  }
}

module.exports = DisciplinaFacade;
