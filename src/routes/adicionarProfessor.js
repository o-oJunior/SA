const express = require('express');
const router = express.Router();
const controller = require('../controller/adicionarProfessor');

router.get('/adicionar', controller.adicionarProfessor);

module.exports = router