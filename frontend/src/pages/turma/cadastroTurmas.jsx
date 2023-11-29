import { useState } from 'react';
import './turmas.css';

const initialValue = {
  codigo: '',
  numero_alunos: '',
  turno: '',
};
export default function CadastrarTurmas() {
  const [turma, setTurma] = useState(initialValue);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setTurma({ ...turma, [name]: value });
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      const teste = await fetch('https://api-ensalamento-senai.onrender.com/api/turmas/adicionar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(turma),
      });

      console.log('Aqui chegou');
      console.log(teste);
      console.log(turma);
    } catch (error) {
      console.log(error);
    }
  };

  const clear = () => {
    setTurma(initialValue);
  };

  return (
    <div className="containerTurma">
      <span className="title">Cadastrar Turma</span>
      <form className="containerForm">
        <div className="formContent">
          <div className="groupInput">
            <label>Código</label>
            <input
              type="text"
              placeholder="Código"
              className="inputForm"
              onChange={(e) => handleChange(e)}
              name="codigo"
              value={turma.codigo}
            />
          </div>
          <div className="groupInput">
            <label>Nº Alunos</label>
            <input
              type="number"
              placeholder="Nº Alunos"
              className="inputForm"
              onChange={(e) => handleChange(e)}
              name="numero_alunos"
              value={turma.numero_alunos}
            />
          </div>
          <div className="groupInput">
            <label>Turno</label>
            <select className="inputForm" onChange={(e) => handleChange(e)} name="turno" value={turma.turno}>
              <option value="">Selecione...</option>
              <option value="Matutino">Matutino</option>
              <option value="Vespertino">Vespertino</option>
              <option value="Noturno">Noturno</option>
              <option value="Integral">Integral</option>
            </select>
          </div>
        </div>

        <div className="btnGroup">
          <button className="btnLimpar" onClick={clear}>
            Limpar
          </button>
          <button className="btnSalvar" onClick={save}>
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
