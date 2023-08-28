const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

const routerProfessores = require("./routes/professor.js");
const routerTurmas = require("./routes/turma.js");
const routerDisciplina = require("./routes/disciplina.js");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/professores", routerProfessores);
app.use("/turmas", routerTurmas);
app.use("/disciplinas", routerDisciplina);

app.listen(port, () => {
  console.log(`Servidor disponivel na porta ${port}`);
});
