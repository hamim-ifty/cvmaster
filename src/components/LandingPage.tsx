import React from 'react';
import { SignInButton, useAuth } from '@clerk/clerk-react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  useTheme,
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  Description as ResumeIcon,
  CheckCircle as CheckIcon,
  Download as DownloadIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const { isSignedIn } = useAuth();

  // Custom sign-in handler
  const handleSignIn = () => {
    // This will trigger the sign-in modal
    document.querySelector('[data-clerk-sign-in-button]')?.click();
  };

  const features = [
    {
      icon: <AIIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'AI-Powered Analysis',
      description: 'Get instant feedback on your resume with advanced AI technology.',
    },
    {
      icon: <ResumeIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'ATS Optimization',
      description: 'Ensure your resume passes through applicant tracking systems.',
    },
    {
      icon: <DownloadIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Enhanced Resume',
      description: 'Download professionally rewritten resumes and cover letters.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ py: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight={700} color="primary.main">
              Smart Resume Analyzer
            </Typography>
            {/* Hidden SignInButton for functionality */}
            <SignInButton mode="modal">
              <button data-clerk-sign-in-button style={{ display: 'none' }}>Hidden</button>
            </SignInButton>
            
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: 'text.primary',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Transform Your Resume with AI
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Get instant AI-powered feedback, ATS optimization, and professional 
            rewriting to land your dream job.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            onClick={handleSignIn}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
            }}
          >
            Start Free Analysis
          </Button>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mb: 8 }}>
          {[
            { value: '50K+', label: 'Resumes Analyzed' },
            { value: '95%', label: 'Success Rate' },
            { value: '4.9/5', label: 'User Rating' },
            { value: '24/7', label: 'AI Support' },
          ].map((stat, index) => (
            <Box key={index} sx={{ textAlign: 'center', minWidth: 120 }}>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Features */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}
          >
            How It Works
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3, 
            justifyContent: 'center' 
          }}>
            {features.map((feature, index) => (
              <Card key={index} sx={{ 
                maxWidth: 300, 
                flex: '1 1 280px',
                p: 3, 
                textAlign: 'center' 
              }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Steps */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}
          >
            Three Simple Steps
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4, 
            justifyContent: 'center' 
          }}>
            {[
              { step: '1', title: 'Upload Resume', desc: 'Upload your resume or paste the text' },
              { step: '2', title: 'AI Analysis', desc: 'Our AI analyzes and scores your resume' },
              { step: '3', title: 'Get Results', desc: 'Download enhanced resume and cover letter' },
            ].map((item, index) => (
              <Box key={index} sx={{ textAlign: 'center', maxWidth: 250 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  {item.step}
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Benefits */}
        <Card sx={{ p: 4, bgcolor: 'grey.50' }}>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            gap: 4 
          }}>
            <Box sx={{ flex: '1 1 400px' }}>
              <Typography variant="h4" gutterBottom fontWeight={600}>
                Why Choose Our Platform?
              </Typography>
              <Stack spacing={1}>
                {[
                  'Instant AI-powered analysis',
                  'ATS-optimized formatting',
                  'Professional rewriting',
                  'Custom cover letters',
                  'Multiple file formats',
                  'Secure and private',
                ].map((benefit, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckIcon sx={{ color: 'success.main', mr: 2 }} />
                    <Typography variant="body1">{benefit}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Box sx={{ flex: '1 1 300px', textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
                92/100
              </Typography>
              <Typography variant="h6" gutterBottom>
                Average Score Improvement
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} sx={{ color: 'warning.main' }} />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                Trusted by 50,000+ professionals
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of professionals who've improved their resumes with AI.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleSignIn}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Start Free Analysis
            </Button>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
              No credit card required • Free forever
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Smart Resume Analyzer
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2024 Smart Resume Analyzer. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;