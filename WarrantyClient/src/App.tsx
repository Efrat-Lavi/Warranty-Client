import { Provider } from 'react-redux';
import store  from './redux/store';
import { BrowserRouter as Router, Routes, RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// export const baseUrl = "https://localhost:7200"
export const baseUrl = "https://warranty-server-g7vn.onrender.com"
//
function App() {
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
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
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
  })
  return (
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Router>
        <Routes>
        </Routes>
      </Router>
    </Provider></ThemeProvider>
  );
}

export default App;
