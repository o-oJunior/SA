const FacadeDias = require('../facades/dia');

const facadeDias = new FacadeDias();

exports.buscarTodosDias = async (req, res) => {
  try {
    facadeDias.conectarDatabase();
    const resultados = await facadeDias.buscarTodosDias();
    const formatarResultados = [];
    resultados.forEach((resultado) =>
      formatarResultados.push({ id: resultado.id, diaSemana: resultado.dia_semana })
    );
    res.status(200).send(formatarResultados);
    facadeDias.desconectarDatabase();
  } catch (error) {
    res.status(500).send(error);
  }
};
