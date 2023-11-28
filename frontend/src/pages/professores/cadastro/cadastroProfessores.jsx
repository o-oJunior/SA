import React, { useState } from 'react';
import './cadastroProfessores.css';

export default function CadastroProfessores() {
  const [professor, setProfessor] = useState({});

  const handleVoltar = () => {
    window.history.back();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setProfessor({ ...professor, [name]: value });
  };

  const handleSalvar = async () => {
    try {
      const response = await fetch('https://api-ensalamento-senai.onrender.com/api/professores/adicionar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(professor),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        // Dados salvos com sucesso
      } else {
        console.error(result);
        // Tratar erro
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="divGeral">
      <div className="formContainer">
        <div className="inputGroup">
          <label>Nome do Professor</label>
          <input
            type="text"
            placeholder="Nome Professor"
            value={professor.nome}
            onChange={(e) => handleChange(e)}
            name="nome"
          />
        </div>

        <div className="inputGroup">
          <label>CPF</label>
          <input
            type="text"
            placeholder="CPF"
            value={professor.cpf}
            onChange={(e) => handleChange(e)}
            name="cpf"
          />
        </div>

        <div className="inputGroup">
          <label>Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            value={professor.telefone}
            onChange={(e) => handleChange(e)}
            name="telefone"
          />
        </div>

        <div className="inputGroup">
          <label>Matricula</label>
          <input
            type="text"
            placeholder="Matricula"
            value={professor.matricula}
            onChange={(e) => handleChange(e)}
            name="matricula"
          />
        </div>
      </div>

      <div className="botoes">
        <button onClick={handleSalvar}>Salvar</button>
        <button>Cancelar</button>
      </div>

      <button className="buttonBack" onClick={handleVoltar}>
        Voltar
      </button>
    </div>
  );
}
