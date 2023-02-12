import * as C from './style';

interface ButtonProps {
  variant?: C.ButtonVariant;
}

export const Button = ({ variant = 'primary' }: ButtonProps) => {
  return <C.ButtonContainer variant={variant}>index</C.ButtonContainer>;
};
