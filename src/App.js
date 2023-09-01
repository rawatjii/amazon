import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import axios from './axios';
import { useDispatch, useSelector } from 'react-redux';
import colorTheme from './Components/ColorTheme/ColorTheme';
import Home from './views/Home';
import Register from './views/Register/Register';
import Today_Deals from './views/Today-Deals/Today-Deals';
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
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/today-deals' element={<Today_Deals />} />
            <Route exact path='/' element={<Home />} />
          </Routes>
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
