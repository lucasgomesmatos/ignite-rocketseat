import { HomeContainer } from './style';

export const Home = () => {
  return (
    <HomeContainer>
      <form>
        <label htmlFor="task">Vou trabalhar em</label>
        <input type="text" id="task" />
        <label htmlFor="minutesAmount">durante</label>
        <input type="text" id="minutesAmount" />
        <span>minutos</span>
      </form>
    </HomeContainer>
  );
};
