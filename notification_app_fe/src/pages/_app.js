import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar';
import { Log } from '../../../logging_middleware/src/index.js';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f7fa',
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const initApp = async () => {
      await Log('frontend', 'info', 'page', 'Application root mounted');
    };
    initApp();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
