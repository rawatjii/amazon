import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import axios from './axios';
import { useDispatch, useSelector } from 'react-redux';
import colorTheme from './Components/ColorTheme/ColorTheme';
import Home from './views/Home';
import Register from './views/Register/Register';
import { fetchProducts } from './store/reducers/productsReducer';
// css
import './App.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
}, [])
  

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
