const { Router } = require('express');
const router = Router();
const controller = require('../controllers/disciplina');

router.get('/', controller.buscarTodasDisciplinas);
router.get('/professor', controller.buscarDisciplinaPorProfessor);
router.get('/disciplina', controller.buscarDisciplinaPorNome);
router.get('/turma', controller.buscarDisciplinaPorTurma);
router.get('/disciplina&turma', controller.buscarDisciplinaPorNomeETurma);
router.post('/adicionar', controller.adicionarDisciplina);
router.delete('/deletar/disciplina&turma&dia', controller.deletarDiaDisciplina);
router.delete('/deletar/disciplina&turma', controller.deletarTurmaDisciplina);
router.put('/editar/disciplina', controller.editarDisciplina);

module.exports = router;
