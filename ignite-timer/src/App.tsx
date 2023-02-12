import { ThemeProvider } from 'styled-components';
import { Button } from './components/Button';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/theme/default';

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Button variant="danger" />
      <Button variant="secondary" />
      <Button variant="primary" />
      <Button variant="success" />
    </ThemeProvider>
  );
};
