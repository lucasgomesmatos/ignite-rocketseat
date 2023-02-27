import styles from './App.module.css';
import { Header } from './components/Header/Header';
import { Post } from './components/Posts/Post';
import { Sidebar } from './components/Sidebar/Sidebar';

const post = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/lucasgomesmatos.png',
      name: 'Lucas Gomes',
      role: 'Developer Software',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz',
      },
      {
        type: 'paragraph',
        content:
          'no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        type: 'link',
        content: '👉  jane.design/doctorcare',
      },
    ],
    publishedAt: new Date('2023-05-03 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/lucasgomesmatos.png',
      name: 'Lucas Gomes',
      role: 'Developer Software',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz',
      },
      {
        type: 'paragraph',
        content:
          'no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        type: 'link',
        content: '👉  jane.design/doctorcare',
      },
    ],
    publishedAt: new Date('2023-05-10 20:00:00'),
  },
];

export const App = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {post.map((item) => (
            <Post
              key={item.id}
              author={item.author}
              content={item.content}
              publishedAt={item.publishedAt}
            />
          ))}
        </main>
      </div>
    </>
  );
};
