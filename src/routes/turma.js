const { Router } = require('express');
const router = Router();
const controller = require('../controllers/turma');

router.get('/', controller.buscarTodasTurmas);
router.post('/adicionar', controller.adicionarTurma);
router.put('/editar/turma', controller.editarTurma);
router.delete('/deletar/turma', controller.deletarTurma);

module.exports = router;
