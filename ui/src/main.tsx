import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { Web3Provider } from './contexts/Web3Context.tsx';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Web3Provider>
        <CssBaseline enableColorScheme />
        <App />
      </Web3Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
