const { Router } = require("express");
const router = Router();
const controller = require("../controller/professores");

router.get("/", controller.buscarTodosProfessores);
router.post("/adicionar", controller.adicionarProfessor);
router.delete("/deletar/id/:id", controller.deletarProfessor);

module.exports = router;
