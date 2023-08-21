const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const app = express()
dotenv.config()
const port = process.env.PORT
const professorRouter = require('./routes/professores.js')

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.use('/professores', professorRouter)

app.listen(port, () => {
    console.log(`Servidor disponivel na porta ${port}`)
})