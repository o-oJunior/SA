const { buscarTodosDias } = require("../model/dia")

exports.buscarTodosDias = async (req, res) => {
    try {
        const results = await buscarTodosDias()
        res.status(200).send(results.rows)
    } catch (error) {
        res.status(500).send({error: "Ocorreu um erro inesperado!"})
    }
}