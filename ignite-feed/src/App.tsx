import { Header } from './components/Header/Header';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Post } from './components/Posts/Post';

export const App = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post />
          <Post />
        </main>
      </div>
    </>
  );
};
