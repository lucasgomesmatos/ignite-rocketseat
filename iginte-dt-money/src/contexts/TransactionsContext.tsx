import { createContext, ReactNode, useEffect, useState } from 'react';

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
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  async function getTransactions() {
    const response = await fetch('http://localhost:5898/transactions');
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
