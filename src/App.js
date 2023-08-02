import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import colorTheme from './Components/ColorTheme/ColorTheme';
import Home from './views/Home';
import Register from './views/Register/Register';
// css
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={colorTheme}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
