import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface Transactions {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transactions[];
  fetTransactions: (query?: string) => Promise<void>;
  createTransaction: <T>(data: T) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  async function createTransaction<T>(data: T) {
    const response = await api.post('transactions', {
      ...data,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  }

  async function fetTransactions(query?: string) {
    const { data } = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    });

    setTransactions(data);
  }

  useEffect(() => {
    fetTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, fetTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
