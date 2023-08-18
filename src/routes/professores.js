const { Router } = require('express')
const professorRouter = Router()

professorRouter.get('/', (req, res) => {
    res.status(200).send({message: 'Rota de professores criada'})
})

module.exports = professorRouter