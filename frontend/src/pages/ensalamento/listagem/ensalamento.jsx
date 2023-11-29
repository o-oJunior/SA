import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import EnsalamentoModal from '../../../components/modal';
import './ensalamento.css';


export default function Ensalamento() {
  // Estados para armazenar dados
  const [professores, setProfessores] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [dias, setDias] = useState([]);
  const [disciplina, setDisciplina] = useState({});
  const [ensalamentos, setEnsalamentos] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [select, setSelect] = useState([])


  // Efeitos para buscar dados ao carregar o componente
  useEffect(() => {
    buscarProfessores();
    buscarTurmas();
    buscarDisciplinas();
    buscarDias();
    handeDisciplinas();
  }, []);

  const buscarDisciplinaPorNomeETurma = async (disciplina) => {
    try {
      const response = await fetch(`https://api-ensalamento-senai.onrender.com/api/disciplinas/disciplina&turma?nome=${disciplina.nomeDisciplina}&idTurma=${disciplina.idTurma}`)
      const results = await response.json()
      setSelect(results)
      setModalShow(true)
    } catch (error) {
      console.log('Ocorreu um erro ao exibir os detalhes!')
    }
  }

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

  //Função para adicionar os dados no banco
  const addDisciplina = async () => {
    try {
      await fetch(`https://api-ensalamento-senai.onrender.com/api/disciplinas/adicionar`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(disciplina),
        });

      console.log(disciplina)

    } catch (error) {
      console.error('Erro ao adicionar disciplina:', error);
    }
  }

  const handeDisciplinas = async () => {
    try {
      const response = await fetch(`https://api-ensalamento-senai.onrender.com/api/disciplinas`);
      const data = await response.json();
      setEnsalamentos(data)
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
    }
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setDisciplina({ ...disciplina, [name]: value })
  }

  return (
    <div>
      <div className='divGeral'>
        <Form>
          {/* Inputs para Disciplina e Semestre */}
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridDisciplina">
              <Form.Label>Disciplina</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escreva a disciplina"
                value={disciplina.nome}
                onChange={(e) => handleChange(e)}
                name="nome"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSemestre">
              <Form.Label>Semestre</Form.Label>
              <Form.Control
                type="number"  /* Alterado para aceitar apenas números */
                placeholder="Ex: 1"
                value={disciplina.semestre}
                onChange={(e) => handleChange(e)}
                name="semestre"
                style={{ maxWidth: '80px' }}  /* Definido um tamanho máximo para o input */
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCarga">
              <Form.Label>Carga Horária</Form.Label>
              <Form.Control
                type="number"  /* Alterado para aceitar apenas números */
                placeholder="Ex: 1"
                value={disciplina.carga_horaria}
                onChange={(e) => handleChange(e)}
                name="cargaHoraria"
                style={{ maxWidth: '80px' }}  /* Definido um tamanho máximo para o input */
              />
            </Form.Group>
          </Row>

          {/* Selects para Professor, Turma e Dia */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridProfessor">
              <Form.Label>Selecione um Professor</Form.Label>
              <Form.Select
                value={disciplina.id_professor}
                onChange={(e) => handleChange(e)}
                name="idProfessor"
              >
                {Array.isArray(professores) &&
                  <>
                    <option value=''>Selecione professor...</option>
                    {professores.map((professor) => (
                      <option key={`professor-${professor.id}`} value={professor.id}>
                        {professor.nome}
                      </option>
                    ))}
                  </>
                }
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTurma">
              <Form.Label>Selecione uma Turma</Form.Label>
              <Form.Select
                value={disciplina.id_turma}
                onChange={(e) => handleChange(e)}
                name="idTurma"
              >
                {Array.isArray(turmas) &&
                  <>
                    <option key="turma-default" value="">
                      Selecione turma...
                    </option>
                    {turmas.map((turma) => (
                      <option key={`turma-${turma.id}`} value={turma.id}>
                        {turma.codigo}
                      </option>
                    ))}
                  </>
                }
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDias">
              <Form.Label>Selecione um Dia</Form.Label>
              <Form.Select
                value={disciplina.id_dia}
                onChange={(e) => handleChange(e)}
                name="idDia"
              >
                {Array.isArray(dias) &&
                  <>
                    <option key="dia-default" value="">
                      Selecione dia...
                    </option>
                    {dias.map((dia) => (
                      <option key={`dia-${dia.id}`} value={dia.id}>
                        {dia.diaSemana}
                      </option>
                    ))}
                  </>
                }
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Botão para Salvar */}
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={addDisciplina}>
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
              <th scope='col'>Detalhes</th>
              <th scope='col'>Turma</th>
              <th scope='col'>Disciplina</th>
              <th scope='col'>Semestre</th>
              <th scope='col'>Carga Horária</th>
            </tr>
          </thead>
          <tbody>
            {ensalamentos.map((ensalamento, i) => (
              <tr key={i}>
                <td>
                  <Button
                    variant="link"
                    className="btn btn-link"
                    onClick={() => buscarDisciplinaPorNomeETurma(ensalamento)}
                  >
                    Detalhes
                  </Button>
                </td>
                <td>{ensalamento.codigoTurma}</td>
                <td>{ensalamento.nomeDisciplina}</td>
                <td>{ensalamento.semestre}</td>
                <td>{ensalamento.cargaHoraria} Horas</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {modalShow && <EnsalamentoModal show={modalShow} item={select} handleClose={() => setModalShow(false)}/>}
    </div>
  );
}

