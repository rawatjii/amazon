import React from 'react';
import { createTheme } from '@mui/material/styles';

const colorTheme = createTheme({
    palette: {
      primary: {
        main: '#0f1111',
      },
      secondary: {
        main: '#FFD814',
      },
      orange: {
        main: '#febd69',
      },
    },
});

export default colorTheme;