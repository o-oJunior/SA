import './cadastroProfessores.css';

export default function CadastroProfessores() {
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

      <div className="periodoProfessor">
        <label>Período disponivel:</label>
        <input type="checkbox" /> <span>Matutino</span>
        <input type="checkbox" /> <span>Verpertino</span>
        <input type="checkbox" /> <span>Noturno</span>
      </div>

      <div className="diasDisponivel">
        <label>Dia disponivel:</label>
        <input type="checkbox" /> <span> Segunda-feira</span>
        <input type="checkbox" /> <span> Terça-feira</span>
        <input type="checkbox" /> <span> Quarta-feira</span>
        <input type="checkbox" /> <span> Quinta-feira</span>
        <input type="checkbox" /> <span> Sexta-feira</span>
      </div>

      <div className="materias">
        <div>
          <label>Matérias:</label>
        </div>
        <div className="coluna">
          <div className="checkBoxGroup">
            <input type="checkbox" />
            <label>Lógica de Programação</label>
          </div>
          <div className="checkBoxGroup">
            <input type="checkbox" />
            <label>Programação de Aplicativos</label>
          </div>
          <div className="checkBoxGroup">
            <input type="checkbox" />
            <label>Internet das Coisas</label>
          </div>
          <div className="checkBoxGroup">
            <input type="checkbox" />
            <label>Modelagem de Sistemas</label>
          </div>
          <div className="checkBoxGroup">
            <input type="checkbox" />
            <label>Desenvolvimento de Sistemas</label>
          </div>
        </div>

        <div className="coluna">
          <div className="checkBoxGroup">
            <input type="checkbox" />
            <label>Fundamento de Eletroeletronica Aplicada</label>
          </div>
          <div className="checkBoxGroup">
            <input type="checkbox" />
            <label>Banco de Dados</label>
          </div>
          <div className="checkBoxGroup">
            <input type="checkbox" />
            <label>Manutenção de Sistemas</label>
          </div>
          <div className="checkBoxGroup">
            <input type="checkbox" />
            <label>Implantação de Sistemas</label>
          </div>
          <div className="checkBoxGroup">
            <input type="checkbox" />
            <label>Testes de Sistemas</label>
          </div>
        </div>
      </div>
      <div className="botoes">
        <button>Salvar</button>
        <button>Cancelar</button>
      </div>
    </div>
  );
}
