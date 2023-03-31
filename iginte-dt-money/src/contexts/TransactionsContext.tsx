import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface Transactions {
  id: number;
  description: string;
  type: 'income' | 'outcome' | 'danger';
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transactions[];
  fetTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  async function fetTransactions(query?: string) {
    const { data } = await api.get('transactions', {
      params: {
        q: query,
      },
    });

    setTransactions(data);
  }

  useEffect(() => {
    fetTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, fetTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
