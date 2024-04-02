import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ThemeProvider } from "@mui/material";
import { store } from "./redux/store";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import theme from './Theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
    </ThemeProvider>
);