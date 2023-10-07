const { Router } = require('express');
const controller = require('../controllers/dia');
const router = Router();

router.get('/', controller.buscarTodosDias);

module.exports = router;
