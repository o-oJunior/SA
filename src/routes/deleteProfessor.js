const express = require('express');
const router = express.Router();
const controller = require('../controller/deleteProfessor');

router.delete('/:id', controller.deletarProfessor);

module.exports = router;