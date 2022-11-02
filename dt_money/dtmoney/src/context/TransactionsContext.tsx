import React, { createContext, ReactNode, useEffect, useState } from 'react';
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
  createTransaction: (transaction: ITransactionsInputPros) => void;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<ITransactionsContextData>(
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

  const createTransaction = (transaction: ITransactionsInputPros) => {
    api.post('/transactions', transaction);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};
