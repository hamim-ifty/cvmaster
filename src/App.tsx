import React from 'react';
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Stack,
  Chip,
  Avatar,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Grid,
  Paper
} from '@mui/material';
import {
  Description as ResumeIcon,
  AutoAwesome as MagicIcon,
  Login as LoginIcon,
  RateReview as RateIcon,
  Edit as EditIcon,
  Mail as MailIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import Dashboard from './Dashboard';

// Create a custom theme with DM Sans
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

function App() {
  const { isSignedIn } = useUser();

  // If user is signed in, show the dashboard
  if (isSignedIn) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
          <UserButton afterSignOutUrl="/" />
        </Box>
        <Dashboard />
      </ThemeProvider>
    );
  }

  // Landing page for non-authenticated users
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Header */}
        <Box sx={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
          <SignInButton mode="modal">
            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'grey.50',
                  boxShadow: 4,
                },
              }}
            >
              Sign In
            </Button>
          </SignInButton>
        </Box>

        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            pt: 12,
            pb: 16,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 4 }}>
                  <Chip 
                    icon={<MagicIcon />}
                    label="AI-Powered Resume Analysis" 
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      mb: 3,
                      fontWeight: 500,
                    }} 
                  />
                  <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                    Smart Resume Analyzer & Rewriter
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
                    Transform your resume with AI. Get instant ratings, professional rewrites, and tailored cover letters.
                  </Typography>
                  <SignInButton mode="modal">
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<MagicIcon />}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        boxShadow: 3,
                        '&:hover': {
                          bgcolor: 'grey.100',
                          transform: 'translateY(-2px)',
                          boxShadow: 6,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Get Started Free
                    </Button>
                  </SignInButton>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
                  <Paper
                    elevation={8}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transform: 'rotate(-5deg)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <ResumeIcon />
                      </Avatar>
                      <Typography variant="h6" color="text.primary">Your Resume Score</Typography>
                    </Box>
                    <Typography variant="h2" color="primary.main" sx={{ mb: 1 }}>85/100</Typography>
                    <Typography color="text.secondary">Great match for Senior Developer!</Typography>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 2 }}>
            How It Works
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, fontWeight: 400 }}>
            Transform your career in 3 simple steps
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.light', mx: 'auto', mb: 3 }}>
                  <ResumeIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  1. Upload Your Resume
                </Typography>
                <Typography color="text.secondary">
                  Simply upload your current resume in any format. Our AI will analyze it instantly.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: 'secondary.light', mx: 'auto', mb: 3 }}>
                  <RateIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  2. Get AI Rating
                </Typography>
                <Typography color="text.secondary">
                  Select your target role and receive an instant compatibility score with detailed feedback.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: 'error.light', mx: 'auto', mb: 3 }}>
                  <EditIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  3. Download Enhanced Resume
                </Typography>
                <Typography color="text.secondary">
                  Get a professionally rewritten resume and custom cover letter tailored to your goals.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Features List */}
        <Box sx={{ bgcolor: 'grey.50', py: 10 }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h3" gutterBottom>
                  Powered by Google Gemini AI
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
                  Our advanced AI technology ensures your resume stands out
                </Typography>
                
                <Stack spacing={3}>
                  {[
                    'Instant resume rating based on your target role',
                    'Professional rewriting with industry-specific keywords',
                    'ATS-friendly formatting in Markdown',
                    'Personalized cover letter generation',
                    'Real-time suggestions and improvements',
                    'Support for multiple file formats'
                  ].map((feature, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckIcon color="secondary" sx={{ mr: 2 }} />
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative' }}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      Ready to enhance your career?
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                      Join thousands of professionals who've improved their resumes with our AI technology.
                    </Typography>
                    <SignInButton mode="modal">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        startIcon={<MagicIcon />}
                      >
                        Start Your Free Analysis
                      </Button>
                    </SignInButton>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4 }}>
          <Container maxWidth="lg">
            <Typography variant="body2" align="center">
              © 2025 Cv Master | All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;