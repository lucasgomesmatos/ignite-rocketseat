import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { App } from './App';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/theme/default';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
