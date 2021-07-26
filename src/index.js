import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './theme';
import "@fontsource/chivo/400.css";
import "@fontsource/chivo/700.css";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

