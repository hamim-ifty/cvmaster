import { useUser, UserButton } from '@clerk/clerk-react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const { isSignedIn } = useUser();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isSignedIn ? (
        <>
          <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
            <UserButton afterSignOutUrl="/" />
          </Box>
          <Dashboard />
        </>
      ) : (
        <LandingPage />
      )}
    </ThemeProvider>
  );
}

export default App;