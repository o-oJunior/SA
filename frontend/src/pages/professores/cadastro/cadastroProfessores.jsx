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

  const handleCpfChange = (event) => {
    const value = event.target.value;
    // Remove caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');
    // Limita o comprimento para 11 dígitos (tamanho máximo de um CPF)
    const truncatedValue = cleanedValue.slice(0, 11);
    // Aplica a formatação desejada (XXX.XXX.XXX-XX)
    const formattedValue = truncatedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    // Atualiza o estado imediatamente
    setProfessor((prevProfessor) => ({ ...prevProfessor, cpf: formattedValue }));
  };

  const handleTelefoneChange = (event) => {
    const value = event.target.value;
    // Remove caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');
    // Limita o comprimento para 11 dígitos (tamanho máximo de um número de telefone)
    const truncatedValue = cleanedValue.slice(0, 11);
    // Aplica a formatação desejada (XX) XXXXX-XXXX
    const formattedValue = truncatedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    // Atualiza o estado imediatamente
    setProfessor((prevProfessor) => ({ ...prevProfessor, telefone: formattedValue }));
  };

  const handleMatriculaChange = (event) => {
    let value = event.target.value;
    // Remove caracteres não alfanuméricos
    value = value.replace(/[^a-zA-Z0-9]/g, '');
    // Limita o comprimento para 6 caracteres (3 letras + 3 números)
    const truncatedValue = value.slice(0, 6);
    // Separa os três primeiros caracteres (letras) e os três seguintes (números)
    const letters = truncatedValue.slice(0, 3).toUpperCase();
    const numbers = truncatedValue.slice(3, 6).replace(/\D/g, ''); // Remove caracteres não numéricos
    // Garante que as três primeiras entradas sejam letras
    const formattedLetters = letters.replace(/[^a-zA-Z]/g, '');
    // Formata como XXXNNN
    const formattedValue = `${formattedLetters}${numbers}`;
    // Atualiza o estado imediatamente
    setProfessor((prevProfessor) => ({ ...prevProfessor, matricula: formattedValue }));
  };

  const handleCancelar = () => {
    setProfessor({});
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

        // Limpar os campos após o salvamento bem-sucedido
        setProfessor({});
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
            value={professor.nome || ''}
            onChange={(e) => handleChange(e)}
            name="nome"
          />
        </div>

        <div className="inputGroup">
          <label>CPF</label>
          <input
            type="text"
            placeholder="CPF"
            value={professor.cpf || ''}
            onChange={((e) => handleChange(e), (e) => handleCpfChange(e))}
            name="cpf"
          />
        </div>

        <div className="inputGroup">
          <label>Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            value={professor.telefone || ''}
            onChange={((e) => handleChange(e), (e) => handleTelefoneChange(e))}
            name="telefone"
          />
        </div>

        <div className="inputGroup">
          <label>Matricula</label>
          <input
            type="text"
            placeholder="Matricula"
            value={professor.matricula || ''}
            onChange={((e) => handleChange(e), (e) => handleMatriculaChange(e))}
            name="matricula"
          />
        </div>
      </div>

      <div className="botoes">
        <button onClick={handleSalvar}>Salvar</button>
        <button onClick={handleCancelar}>Cancelar</button>
      </div>

      <button className="buttonBack" onClick={handleVoltar}>
        Voltar
      </button>
    </div>
  );
}
