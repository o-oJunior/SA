import './cadastroProfessores.css';

export default function CadastroProfessores() {
  const handleVoltar = () => {
    window.history.back();
  };

  return (
    <div className="divGeral">
      <div className="formContainer">
        <div className="inputGroup">
          <label>Nome do Professor</label>
          <input type="text" placeholder="Nome Professor" />
        </div>

        <div className="inputGroup">
          <label>CPF</label>
          <input type="text" placeholder="CPF" />
        </div>

        <div className="inputGroup">
          <label>Telefone</label>
          <input type="text" placeholder="Telefone" />
        </div>
      </div>

      <div className="botoes">
        <button>Salvar</button>
        <button>Cancelar</button>
      </div>

      <button className="buttonBack" onClick={handleVoltar}>
        Voltar
      </button>
    </div>
  );
}
