const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const professorRouter = require('./routes/professores.js')

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.use('/professores', professorRouter)

app.listen(port, () => {
    console.log(`Servidor disponivel na porta ${port}`)
})