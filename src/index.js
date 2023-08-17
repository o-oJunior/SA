const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200).send({message: 'Funcionou'})
})

app.listen(port, () => {
    console.log(`Servidor disponivel na porta ${port}`)
})