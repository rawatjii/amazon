import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './Components/Navbar/Navbar'
import colorTheme from './Components/ColorTheme/ColorTheme';
import HeroSlider from './Containers/HeroSlider/HeroSlider';
// css
import './App.css';

function App() {
  return (
    <ThemeProvider theme={colorTheme}>
      <Navbar />
      <HeroSlider />
    </ThemeProvider>
  );
}

export default App;
