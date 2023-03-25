import { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './style';

interface TransactionsProps {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  async function getTransactions() {
    const response = await fetch('http://localhost:5898/transactions');
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      R$ {transaction.price}
                    </PriceHighlight>{' '}
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
