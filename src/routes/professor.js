const { Router } = require("express");
const router = Router();
const controller = require("../controller/professor");

router.get("/", controller.buscarTodosProfessores);
router.post("/adicionar", controller.adicionarProfessor);
router.delete("/deletar/id/:id", controller.deletarProfessor);
router.put("/editar/id/:id", controller.editarProfessor);

module.exports = router;
