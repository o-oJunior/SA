const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const app = express()
dotenv.config()
const port = process.env.PORT
const professorRouter = require('./routes/professores.js')
const adicionarProfessorRouter = require('./routes/adicionarProfessor')

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.use('/professores', professorRouter)
app.use('/professores', adicionarProfessorRouter)

app.listen(port, () => {
    console.log(`Servidor disponivel na porta ${port}`)
})