import { useContext } from 'react';
import { Header } from '../../components/header';
import { Summary } from '../../components/Summary';
import { TransactionContext } from '../../contexts/TransactionsContext';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './style';

export const Transactions = () => {
  const { transactions } = useContext(TransactionContext);

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
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
