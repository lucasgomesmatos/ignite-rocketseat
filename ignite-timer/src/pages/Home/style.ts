import styled from 'styled-components';

export const HomeContainer = styled.main`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

const BaseCountDownButton = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};

  cursor: pointer;
  transition: 0.3s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountDownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`;

export const StopCountDownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }
`;
