import { useEffect, useState } from 'react';
import { api } from '../../service/api';
import { Container } from './styles';

interface ITransactionsPros {
  id: number;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  amount: number;
  createAt: string;
}

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<ITransactionsPros[]>([]);

  useEffect(() => {
    api
      .get('/transactions')
      .then((res) => setTransactions(res.data.transactions));
  }, []);

  console.log(transactions);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transaction.createAt),
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
};
