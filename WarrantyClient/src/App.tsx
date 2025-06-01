
import { Provider } from 'react-redux';
import store from './redux/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRouter from './Router';

export function getClientId() {
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID as string);
  
  return import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
}

export function getBaseUrl() {
  return import.meta.env.VITE_BASE_URL as string;
}

function App() {
  const CLIENT_ID = getClientId();
  const BASE_URL = getBaseUrl();

  console.log(CLIENT_ID, "clientId");
  console.log(BASE_URL, "baseUrl");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#10a37f",
      },
      secondary: {
        main: "#6e6e80",
      },
      background: {
        default: "#f9fafb",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 600 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
