const { Router } = require('express');
const router = Router();
const controller = require('../controllers/professor');

router.get('/', controller.buscarTodosProfessores);
router.post('/adicionar', controller.adicionarProfessor);
router.delete('/deletar/professor', controller.deletarProfessor);
router.put('/editar/professor', controller.editarProfessor);

module.exports = router;
