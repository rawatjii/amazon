import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './Components/Navbar/Navbar'
import colorTheme from './Components/ColorTheme/ColorTheme';
// css
import './App.css';

function App() {
  return (
    <ThemeProvider theme={colorTheme}>
      <Navbar />  
    </ThemeProvider>
  );
}

export default App;
