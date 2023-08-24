const { Router } = require("express");
const router = Router();
const controller = require("../controller/turma");

router.get("/", controller.buscarTodasTurmas);

module.exports = router;
