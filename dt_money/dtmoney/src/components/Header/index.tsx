import logoImg from '../../assets/logo.svg';

export const Header = () => {
  return (
    <header>
      <img src={logoImg} alt="dt money" />
      <button type="button">Nova transação</button>
    </header>
  );
};
