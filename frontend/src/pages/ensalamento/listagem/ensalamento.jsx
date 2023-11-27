import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './ensalamento.css';

export default function Ensalamento() {
  // Estados para armazenar dados
  const [professores, setProfessores] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [dias, setDias] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState('Choose...');
  const [selectedTurma, setSelectedTurma] = useState('Choose...');
  const [selectedDisciplina, setSelectedDisciplina] = useState('');
  const [selectedSemestre, setSelectedSemestre] = useState('');
  const [selectedDia, setSelectedDia] = useState('Choose...');
  const [ensalamentos, setEnsalamentos] = useState([]);

  // Efeitos para buscar dados ao carregar o componente
  useEffect(() => {
    buscarProfessores();
    buscarTurmas();
    buscarDisciplinas();
    buscarDias();
  }, []);

  // Função para buscar professores
  const buscarProfessores = async () => {
    try {
      const response = await fetch(`https://api-ensalamento-senai.onrender.com/api/professores`);
      const data = await response.json();
      setProfessores(data);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
    }
  };

  // Função para buscar turmas
  const buscarTurmas = async () => {
    try {
      const response = await fetch(`https://api-ensalamento-senai.onrender.com/api/turmas`);
      const data = await response.json();
      setTurmas(data);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

  // Função para buscar disciplinas
  const buscarDisciplinas = async () => {
    try {
      const response = await fetch(`https://api-ensalamento-senai.onrender.com/api/disciplinas`);
      const data = await response.json();
      setDisciplinas(data);
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
    }
  };

  // Função para buscar dias
  const buscarDias = async () => {
    try {
      const response = await fetch(`https://api-ensalamento-senai.onrender.com/api/dias`);
      const data = await response.json();
      setDias(data);
    } catch (error) {
      console.error('Erro ao buscar dias:', error);
    }
  };

  // Função para salvar um ensalamento
  const salvaEnsalamento = () => {
    const novoEnsalamento = {
      professor: selectedProfessor,
      turma: selectedTurma,
      disciplina: selectedDisciplina,
      semestre: selectedSemestre,
      dia: selectedDia,
    };

    setEnsalamentos([...ensalamentos, novoEnsalamento]);

    // Limpar os campos após salvar
    setSelectedProfessor('Choose...');
    setSelectedTurma('Choose...');
    setSelectedDisciplina('');
    setSelectedSemestre('');
    setSelectedDia('Choose...');
  };

  return (
    <div>
      <div className='divGeral'>
        <Form>
          {/* Inputs para Disciplina e Semestre */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridDisciplina">
              <Form.Label>Disciplina</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escreva a disciplina"
                value={selectedDisciplina}
                onChange={(e) => setSelectedDisciplina(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSemestre">
              <Form.Label>Semestre</Form.Label>
              <Form.Control
                type="text"  /* Alterado para aceitar apenas números */
                placeholder="Ex: 1"
                value={selectedSemestre}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/, ''); /* Remove qualquer caractere não numérico */
                  setSelectedSemestre(value);
                }}
                style={{ maxWidth: '80px' }}  /* Definido um tamanho máximo para o input */
              />
            </Form.Group>
          </Row>

          {/* Selects para Professor, Turma e Dia */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridProfessor">
              <Form.Label>Selecione um Professor</Form.Label>
              <Form.Select
                value={selectedProfessor}
                onChange={(e) => setSelectedProfessor(e.target.value)}
              >
                <option key="professor-default" value="Choose..." disabled>
                  Selecione...
                </option>
                {Array.isArray(professores) &&
                  professores.map((professor) => (
                    <option key={`professor-${professor.id}`} value={professor.nome}>
                      {professor.nome}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTurma">
              <Form.Label>Selecione uma Turma</Form.Label>
              <Form.Select
                value={selectedTurma}
                onChange={(e) => setSelectedTurma(e.target.value)}
              >
                <option key="turma-default" value="Choose..." disabled>
                  Selecione...
                </option>
                {Array.isArray(turmas) &&
                  turmas.map((turma) => (
                    <option key={`turma-${turma.id}`} value={turma.codigo}>
                      {turma.codigo}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDias">
              <Form.Label>Selecione um Dia</Form.Label>
              <Form.Select
                value={selectedDia}
                onChange={(e) => setSelectedDia(e.target.value)}
              >
                <option key="dia-default" value="Choose..." disabled>
                  Selecione...
                </option>
                {Array.isArray(dias) &&
                  dias.map((dia) => (
                    <option key={`turma-${dia.id}`} value={dia.diaSemana}>
                      {dia.diaSemana}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Botão para Salvar */}
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={salvaEnsalamento}>
              Salvar
            </Button>
          </div>
        </Form>
      </div>

      {/* Tabela para exibir os ensalamentos */}
      <div className='divGeral'>
        <h2>Ensalamentos:</h2>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope='col'>Professor</th>
              <th scope='col'>Turma</th>
              <th scope='col'>Disciplina</th>
              <th scope='col'>Semestre</th>
              <th scope='col'>Dia</th>
            </tr>
          </thead>
          <tbody>
            {ensalamentos.map((ensalamento, index) => (
              <tr key={`ensalamento-${index}`}>
                <td>{ensalamento.professor}</td>
                <td>{ensalamento.turma}</td>
                <td>{ensalamento.disciplina}</td>
                <td>{ensalamento.semestre}</td>
                <td>{ensalamento.dia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
