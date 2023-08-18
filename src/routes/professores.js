const { Router } = require('express')
const ProfessoresController = require('../controller/professores')
const professorRouter = Router()
const profesoresController = new ProfessoresController()

professorRouter.get('/', profesoresController.getTodosProfessores)

module.exports = professorRouter