const { Router } = require("express");
const router = Router();
const controller = require("../controller/turma");

router.get("/", controller.buscarTodasTurmas);
router.post("/adicionar", controller.adicionarTurma);
router.put("/editar/id/:id", controller.editarTurma);
router.delete("/deletar/id/:id", controller.deletarTurma);

module.exports = router;
