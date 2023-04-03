import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { api } from '../lib/axios';

interface newTransaction {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

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
  createTransaction: (data: newTransaction) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const createTransaction = useCallback(async (data: newTransaction) => {
    const { category, description, price, type } = data;
    const response = await api.post('transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    });
    setTransactions((state) => [response.data, ...state]);
  }, []);

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
