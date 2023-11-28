import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './professores.css';

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');

  useEffect(() => {
    buscarProfessores();
  }, []);

  const buscarProfessores = async () => {
    try {
      const response = await fetch(`https://api-ensalamento-senai.onrender.com/api/professores`);
      const data = await response.json();
      setProfessores(data);
    } catch (error) {
      console.log(error);
    }
  };

  const excluirProfessor = async (id) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir este professor?')) {
        // Faça uma solicitação para excluir o professor da API
        await fetch(`https://api-ensalamento-senai.onrender.com/api/professores/deletar/professor?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Atualize a lista de professores localmente
        const updatedProfessores = professores.filter((professor) => professor.id !== id);
        setProfessores(updatedProfessores);
      }
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
    }
  };

  const realizarPesquisa = (termo) => {
    if (!termo.trim()) {
      return professores;
    }

    return professores.filter(
      (professor) =>
        professor.nome.toLowerCase().includes(termo.toLowerCase()) ||
        professor.matricula.toLowerCase().includes(termo.toLowerCase())
    );
  };

  const renderizarListaProfessores = () => {
    const professoresFiltrados = realizarPesquisa(termoPesquisa);

    if (professoresFiltrados.length === 0) {
      return <div>Professor não encontrado</div>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Cpf</th>
            <th scope="col">Telefone</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {professoresFiltrados.map((professor) => (
            <tr key={professor.id}>
              <td>{professor.nome}</td>
              <td>{professor.cpf}</td>
              <td>{professor.telefone}</td>
              <td>
                <button onClick={() => excluirProfessor(professor.id)}>
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <button>
                  <Link to={`/editarProfessores/${professor.id}`}>
                    <i class="fa-solid fa-pen"></i>
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleChangePesquisa = (event) => {
    const novoTermoPesquisa = event.target.value;
    setTermoPesquisa(novoTermoPesquisa);
  };

  return (
    <div className="container-professor">
      <div className="professores">
        <label>Professores</label>
        <div className="listaGroup">
          <input
            placeholder="Pesquisar por Nome ou Matricula de Professor"
            value={termoPesquisa}
            onChange={handleChangePesquisa}
          />
          <Link to="/cadastrarProfessores">
            <button>Adicionar Professor</button>
          </Link>
        </div>
      </div>
      <div className="lista-professor">{renderizarListaProfessores()}</div>
    </div>
  );
};

export default Professores;
