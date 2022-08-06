import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import MainForm from './Components/MainForm';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const client = new ApolloClient({
  uri: 'https://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={darkTheme}>
    <ApolloProvider client={client}>
      <CssBaseline />
      <React.StrictMode>
        <MainForm />
      </React.StrictMode>
    </ApolloProvider>
  </ThemeProvider>
);