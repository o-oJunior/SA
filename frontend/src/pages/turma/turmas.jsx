import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './turmas.css';

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    getTurmas();
  }, []);

  const getTurmas = async () => {
    try {
      const response = await fetch('https://api-ensalamento-senai.onrender.com/api/turmas');
      const results = await response.json();
      setTurmas(results);
    } catch (e) {
      console.log('Ocorreu um erro ao exibir a lista de professores');
    }
  };

  return (
    <div className="containerTurma">
      <div className="groupSearch">
        <input type="text" placeholder="Pesquisar" className="input" />
        <Link to="/cadastrarTurmas">Adicionar Turma</Link>
      </div>

      <div className="listaTurmas">
        <table>
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nº Aluno</th>
              <th scope="col">Turno</th>
            </tr>
          </thead>
          <tbody>
            {turmas.length > 0 &&
              turmas.map((turma) => {
                return (
                  <tr key={turma.id}>
                    <td>{turma.codigo}</td>
                    <td>{turma.numeroAlunos}</td>
                    <td>{turma.turno}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
