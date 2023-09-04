const { Router } = require("express");
const controller = require("../controller/dia");
const router = Router();

router.get("/", controller.buscarTodosDias);

module.exports = router;
