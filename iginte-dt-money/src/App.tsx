import { ThemeProvider } from 'styled-components';
import { TransactionsProvider } from './contexts/TransactionsContext';
import { Transactions } from './pages/transactions';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>
        <GlobalStyle />
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  );
};
