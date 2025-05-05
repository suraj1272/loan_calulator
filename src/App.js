import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import LoanCalculator from "./components/LoanCalculator";
import { AppContext, AppProvider } from "./context/AppContext";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <AppProvider>
      <ThemeProviderWrapper>
        <CssBaseline />
        <Router>
          <Header />
          <Container maxWidth="md">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<LoanCalculator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </Container>
        </Router>
      </ThemeProviderWrapper>
    </AppProvider>
  );
};

const ThemeProviderWrapper = ({ children }) => {
  const { darkMode } = useContext(AppContext);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default App;
