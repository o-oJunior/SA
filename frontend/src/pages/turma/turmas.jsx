import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './turmas.css';
import EnsalamentoModal from '../../components/modal';

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getTurmas();
  }, [search]);

  const getTurmas = async () => {
    try {
      const response = await fetch('https://api-ensalamento-senai.onrender.com/api/turmas');
      const results = await response.json();
      if (search !== '') {
        const filter = results.filter((result) => result.codigo.toLowerCase().includes(search.toLowerCase()));
        setTurmas(filter);
      } else {
        setTurmas(results);
      }
    } catch (e) {
      console.log('Ocorreu um erro ao exibir a lista de professores');
    }
  };

  const deleted = async (idTurma) => {
    try {
      await fetch(`https://api-ensalamento-senai.onrender.com/api/turmas/deletar/turma?id=${idTurma}`, {
        method: 'DELETE',
      });
      getTurmas();
    } catch (error) {
      console.log('Erro ao excluir a turma');
    }
  };

  const openDetails = async (idTurma) => {
    try {
      const response = await fetch(
        `https://api-ensalamento-senai.onrender.com/api/disciplinas/turma?idTurma=${idTurma}`
      );
      const results = await response.json();
      setDetails(results);
      setModal(true);
    } catch (error) {
      alert('Ocorreu um erro ao tentar exibir os detalhes');
    }
  };

  const deletedDay = async (item) => {
    try {
      await fetch(
        `https://api-ensalamento-senai.onrender.com/api/disciplinas/deletar/disciplina&turma&dia?nome=${item.nomeDisciplina}&idTurma=${item.idTurma}&idDia=${item.idDia}`,
        {
          method: 'DELETE',
        }
      );
      alert('Dia excluido com sucesso!');
    } catch (error) {
      alert('Erro ao deletar o dia!');
    }
  };

  return (
    <div className="containerTurma">
      <div className="groupSearch">
        <input
          type="text"
          placeholder="Pesquisar"
          className="input"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
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
                  <tr className="listaTurma" key={turma.id} onClick={() => openDetails(turma.id)}>
                    <td>{turma.codigo}</td>
                    <td>{turma.numeroAlunos}</td>
                    <td>{turma.turno}</td>
                    <td>
                      <i onClick={() => deleted(turma.id)} className="fa-solid fa-trash-can btnDelete"></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {modal && (
        <EnsalamentoModal
          item={details}
          handleClose={() => setModal(false)}
          show={modal}
          deleted={(item) => deletedDay(item)}
        />
      )}
    </div>
  );
}
