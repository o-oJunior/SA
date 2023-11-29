import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function EnsalamentoModal({ show, handleClose, item, deleted }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      {/* Adicionado o tamanho "lg" para modal-lg */}
      <Modal.Header closeButton>
        <Modal.Title>Detalhes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">Professor</th>
              <th scope="col">Turma</th>
              <th scope="col">Disciplina</th>
              <th scope="col">Semestre</th>
              <th scope="col">Carga Horária</th>
              <th scope="col">Dia da Semana</th>
              <th scope="col">Turno</th>
            </tr>
          </thead>
          <tbody>
            {item.map((detail, i) => {
              return (
                <tr key={i}>
                  <td>{detail.nomeProfessor}</td>
                  <td>{detail.codigoTurma}</td>
                  <td>{detail.nomeDisciplina}</td>
                  <td>{detail.semestre}</td>
                  <td>{detail.cargaHoraria}</td>
                  <td>{detail.diaSemana}</td>
                  <td>{detail.turno}</td>
                  <td>
                    <i onClick={() => deleted(detail)} className="fa-solid fa-trash-can btnDelete"></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
