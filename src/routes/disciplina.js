const { Router } = require("express");
const router = Router();
const controller = require("../controller/disciplina");

router.get("/", controller.buscarTodasDisciplinas);

module.exports = router;
