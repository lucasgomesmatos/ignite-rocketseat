import LogoImg from '../../assets/logo.svg';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './style';

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LogoImg} alt="" />
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  );
};
