import { RepositoryList } from './components/RepositoryList';
import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', gap: '45px' }}>
      <RepositoryList />
    </div>
  );
}
