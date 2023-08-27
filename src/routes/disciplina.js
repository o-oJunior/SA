const { Router } = require("express");
const router = Router();
const controller = require("../controller/disciplina");

router.get("/", controller.buscarTodasDisciplinas);
router.delete("/deletar/id/:id", controller.deletarDisciplina);

module.exports = router;
