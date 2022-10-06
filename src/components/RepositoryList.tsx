import { useEffect, useState } from 'react';
import { RepositoryItem } from './RepositoryItem';
import '../styles/repositories.scss';

// https://api.github.com/users/lucasgomesmatos/repos

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    async function repositories() {
      const response = await fetch(
        'https://api.github.com/users/lucasgomesmatos/repos',
      );
      const data = await response.json();
      setRepositories(data);
    }
    repositories();
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de Repositórios</h1>
      <ul>
        {repositories.map((repository) => (
          <RepositoryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  );
}
