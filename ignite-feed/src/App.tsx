import { Header } from './components/Header/Header';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar/Sidebar';

export const App = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>posts</main>
      </div>
    </>
  );
};
