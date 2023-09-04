const { Router } = require("express");
const controller = require("../controller/dia_disciplina");
const router = Router();

router.get("/", controller.buscarTodosDiasDisciplina);

module.exports = router;
