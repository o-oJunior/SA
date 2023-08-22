const express = require('express');
const router = express.Router();
const controller = require('../controller/adicionarProfessor');

router.post('/adicionar', controller.adicionarProfessor);

module.exports = router