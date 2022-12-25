import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../service/api';

interface ITransactionsPros {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createAt: string;
}

type ITransactionsInputPros = Omit<ITransactionsPros, 'id' | 'createAt'>;

interface ITransactionsContextData {
  transactions: ITransactionsPros[];
  createTransaction: (transaction: ITransactionsInputPros) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData,
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransactionsPros[]>([]);

  useEffect(() => {
    api
      .get('/transactions')
      .then((res) => setTransactions(res.data.transactions));
  }, []);

  const createTransaction = async (
    transactionInput: ITransactionsInputPros,
  ) => {
    const response = await api.post('/transactions', {
      transactionInput,
      createAt: new Date(),
    });

    const { transaction } = response.data;

    console.log(transactions);
    console.log(transaction);

    setTransactions([...transactions, transaction]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
};
