import Modal from 'react-modal';
import { Container } from './styles';

interface IModalTransactionProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const ModalTransaction = ({
  isOpen,
  onRequestClose,
}: IModalTransactionProps) => {
  return (
    <Modal
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <h2>Cadastrar transação</h2>

        <input placeholder="Titulo" />
        <input type="number" placeholder="Valor" />
        <input placeholder="Categoria" />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};
