import React from 'react';
import { createTheme } from '@mui/material/styles';

const colorTheme = createTheme({
    palette: {
      primary: {
        main: '#0f1111',
      },
      secondary: {
        main: '#febd69',
      },
      btnColor: {
        main: '#FFD814',
      },
    },
});

export default colorTheme;