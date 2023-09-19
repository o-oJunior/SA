const { Router } = require('express');
const router = Router();
const controller = require('../controllers/disciplina');

router.get('/', controller.buscarTodasDisciplinas);
router.get('/idProfessor=:idProfessor', controller.buscarDisciplinaPorProfessor);
router.get('/nomeDisciplina=:nomeDisciplina', controller.buscarDisciplinaPorNome);
router.get('/idTurma=:idTurma', controller.buscarDisciplinaPorTurma);
router.get('/nome=:nomeDisciplina&idTurma=:idTurma', controller.buscarDisciplinaPorNomeETurma);
router.post('/adicionar', controller.adicionarDisciplina);
router.delete('/deletar/nome=:nomeDisciplina&idTurma=:idTurma&idDia=:idDia', controller.deletarDiaDisciplina);
router.delete('/deletar/nome=:nomeDisciplina&idTurma=:idTurma', controller.deletarTurmaDisciplina);
router.put(
  '/editar/nome=:nome&semestre=:semestre&cargaHoraria=:carga_horaria&idProfessor=:id_professor&idTurma=:id_turma&idDia=:id_dia',
  controller.editarDisciplina
);

module.exports = router;
