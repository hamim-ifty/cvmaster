import React, { useState, useEffect } from 'react';
import { SignInButton } from '@clerk/clerk-react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Avatar,
  Chip,
  Stack,
  Paper,
  Grid,
  IconButton,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Rating,
  Divider,
  Badge,
} from '@mui/material';
import {
  Login as LoginIcon,
  AutoAwesome as MagicIcon,
  Description as ResumeIcon,
  RateReview as RateIcon,
  Edit as EditIcon,
  CheckCircle as CheckIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Psychology as AIIcon,
  TrendingUp as TrendingIcon,
  WorkspacePremium as PremiumIcon,
  Language as GlobalIcon,
  Groups as TeamIcon,
  Analytics as AnalyticsIcon,
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  ArrowForward as ArrowIcon,
  KeyboardArrowDown as ScrollIcon,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px) rotate(-5deg); }
  50% { transform: translateY(-20px) rotate(-3deg); }
  100% { transform: translateY(0px) rotate(-5deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 300) {
        setStatsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '50K+', label: 'Resumes Analyzed', icon: <ResumeIcon /> },
    { value: '95%', label: 'Success Rate', icon: <TrendingIcon /> },
    { value: '4.9/5', label: 'User Rating', icon: <StarIcon /> },
    { value: '24/7', label: 'AI Support', icon: <AIIcon /> },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Tech Corp',
      rating: 5,
      text: 'Increased my interview rate by 300% in just 2 weeks!',
      avatar: 'SC',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      company: 'StartupX',
      rating: 5,
      text: 'The AI suggestions were spot-on. Landed my dream job!',
      avatar: 'MR',
    },
    {
      name: 'Emily Johnson',
      role: 'Data Scientist',
      company: 'AI Labs',
      rating: 5,
      text: 'Best investment in my career. The cover letters are amazing!',
      avatar: 'EJ',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
      {/* Advanced Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? 1 : 0,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AIIcon sx={{ fontSize: 32, color: scrolled ? 'primary.main' : 'white' }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: scrolled ? 'primary.main' : 'white',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                ResumeAI Pro
              </Typography>
            </Box>
            <SignInButton mode="modal">
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                size="large"
                sx={{
                  bgcolor: scrolled ? 'primary.main' : 'white',
                  color: scrolled ? 'white' : 'primary.main',
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 6,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
            </SignInButton>
          </Box>
        </Container>
      </Box>

      {/* Enhanced Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          backgroundSize: '200% 200%',
          animation: `${gradientShift} 15s ease infinite`,
          color: 'white',
          pt: 16,
          pb: 20,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(40px)',
            animation: `${float} 6s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(30px)',
            animation: `${float} 8s ease-in-out infinite`,
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Fade in timeout={1000}>
                <Box>
                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <Chip
                      icon={<MagicIcon />}
                      label="AI-Powered"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      icon={<PremiumIcon />}
                      label="Premium Features"
                      sx={{
                        bgcolor: 'rgba(255, 215, 0, 0.2)',
                        color: 'gold',
                        backdropFilter: 'blur(10px)',
                        fontWeight: 600,
                      }}
                    />
                  </Stack>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '3rem', md: '4.5rem' },
                      fontWeight: 800,
                      mb: 3,
                      lineHeight: 1.1,
                    }}
                  >
                    Your Resume,
                    <br />
                    <Box component="span" sx={{ color: 'gold' }}>
                      Supercharged
                    </Box>
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontWeight: 400, maxWidth: 600 }}>
                    Harness the power of Google Gemini AI to transform your resume into a job-winning masterpiece. Get hired 3x faster.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <SignInButton mode="modal">
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<MagicIcon />}
                        endIcon={<ArrowIcon />}
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          px: 4,
                          py: 2,
                          fontSize: '1.2rem',
                          fontWeight: 600,
                          boxShadow: 4,
                          '&:hover': {
                            bgcolor: 'grey.100',
                            transform: 'translateY(-3px)',
                            boxShadow: 8,
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Start Free Analysis
                      </Button>
                    </SignInButton>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<AnalyticsIcon />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          borderWidth: 2,
                        },
                      }}
                    >
                      View Demo
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={5}>
              <Grow in timeout={1500}>
                <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
                  <Paper
                    elevation={12}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      animation: `${float} 4s ease-in-out infinite`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        opacity: 0.1,
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 56, height: 56 }}>
                        <ResumeIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" color="text.primary" fontWeight={600}>
                          AI Resume Analysis
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Real-time scoring
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                        <Typography variant="h2" color="primary.main" fontWeight={700}>
                          92
                        </Typography>
                        <Typography variant="h4" color="text.secondary" sx={{ ml: 1 }}>
                          /100
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={92}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                          },
                        }}
                      />
                    </Box>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">ATS Compatibility</Typography>
                        <Chip label="Excellent" color="success" size="small" />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">Keyword Match</Typography>
                        <Chip label="95%" color="primary" size="small" />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">Industry Standards</Typography>
                        <Rating value={5} readOnly size="small" />
                      </Box>
                    </Stack>
                  </Paper>
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Container>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        >
          <IconButton sx={{ color: 'white' }}>
            <ScrollIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, position: 'relative', overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Fade in={statsVisible} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                                                transform: 'translateY(-5px)',
                        boxShadow: 4,
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: 'primary.light',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h3" fontWeight={700} color="primary.main">
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Advanced Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="How It Works"
            color="primary"
            sx={{ mb: 2, fontWeight: 600 }}
          />
          <Typography variant="h3" gutterBottom fontWeight={700}>
            Three Steps to Your Dream Job
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Our AI-powered platform transforms your career journey with cutting-edge technology
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: <UploadIcon />,
              title: 'Smart Upload',
              description: 'Drag & drop your resume. Our AI instantly extracts and analyzes every detail.',
              color: 'primary.main',
              features: ['PDF, DOCX, TXT support', 'Instant parsing', 'Secure encryption'],
            },
            {
              icon: <AIIcon />,
              title: 'AI Analysis',
              description: 'Google Gemini AI evaluates your resume against industry standards and job requirements.',
              color: 'secondary.main',
              features: ['Real-time scoring', 'ATS optimization', 'Keyword analysis'],
            },
            {
              icon: <DownloadIcon />,
              title: 'Enhanced Output',
              description: 'Download your professionally rewritten resume and tailored cover letter.',
              color: 'success.main',
              features: ['Multiple formats', 'Custom templates', 'Instant delivery'],
            },
          ].map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Grow in timeout={1000 + index * 300}>
                <Card
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 3,
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      borderColor: step.color,
                      transform: 'translateY(-10px)',
                      boxShadow: 6,
                      '& .step-number': {
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                >
                  <Box
                    className="step-number"
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <Typography variant="h6" fontWeight={700} color="text.secondary">
                      {index + 1}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: step.color,
                      mb: 3,
                    }}
                  >
                    {step.icon}
                  </Avatar>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {step.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {step.description}
                  </Typography>
                  <Stack spacing={1}>
                    {step.features.map((feature, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckIcon sx={{ fontSize: 18, color: 'success.main', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Advanced Features Grid */}
      <Box sx={{ bgcolor: 'grey.50', py: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Chip
                  icon={<PremiumIcon />}
                  label="Premium Features"
                  color="secondary"
                  sx={{ mb: 3, fontWeight: 600 }}
                />
                <Typography variant="h3" gutterBottom fontWeight={700}>
                  Powered by Advanced AI Technology
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                  Experience the future of resume optimization with our cutting-edge features
                </Typography>

                <Grid container spacing={3}>
                  {[
                    {
                      icon: <SpeedIcon />,
                      title: 'Lightning Fast',
                      description: 'Get results in under 30 seconds',
                    },
                    {
                      icon: <SecurityIcon />,
                      title: 'Bank-Level Security',
                      description: 'Your data is encrypted and secure',
                    },
                    {
                      icon: <GlobalIcon />,
                      title: 'Multi-Language Support',
                      description: 'Works with 50+ languages',
                    },
                    {
                      icon: <TeamIcon />,
                      title: 'Industry Expertise',
                      description: 'Tailored for 100+ job categories',
                    },
                  ].map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.light',
                            mr: 2,
                            width: 48,
                            height: 48,
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600} gutterBottom>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -50,
                      right: -50,
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                    }}
                  />
                  <Typography variant="h4" gutterBottom fontWeight={600}>
                    Start Your Success Story
                  </Typography>
                  <Typography sx={{ mb: 4, opacity: 0.9 }}>
                    Join thousands of professionals who've transformed their careers with our AI-powered platform.
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckIcon sx={{ mr: 2 }} />
                      <Typography>Free AI resume analysis</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckIcon sx={{ mr: 2 }} />
                      <Typography>Professional rewriting</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckIcon sx={{ mr: 2 }} />
                      <Typography>Custom cover letters</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckIcon sx={{ mr: 2 }} />
                      <Typography>Unlimited revisions</Typography>
                    </Box>
                  </Stack>
                  <SignInButton mode="modal">
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={<MagicIcon />}
                      sx={{
                        mt: 4,
                        bgcolor: 'white',
                        color: 'primary.main',
                        py: 1.5,
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: 'grey.100',
                          transform: 'scale(1.02)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Get Started Free
                    </Button>
                  </SignInButton>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="Success Stories"
            color="primary"
            sx={{ mb: 2, fontWeight: 600 }}
          />
          <Typography variant="h3" gutterBottom fontWeight={700}>
            Loved by Job Seekers Worldwide
          </Typography>
          <Typography variant="h6" color="text.secondary">
            See what our users are saying about their experience
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in timeout={1000 + index * 200}>
                <Card
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role} at {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    "{testimonial.text}"
                  </Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          py: 10,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography variant="h3" gutterBottom fontWeight={700}>
              Ready to 10x Your Career?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Start your free AI-powered resume analysis today. No credit card required.
            </Typography>
            <SignInButton mode="modal">
              <Button
                variant="contained"
                size="large"
                startIcon={<MagicIcon />}
                endIcon={<ArrowIcon />}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  boxShadow: 4,
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-3px) scale(1.05)',
                    boxShadow: 8,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Free Now
              </Button>
            </SignInButton>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
              Join 50,000+ professionals • Free forever • No credit card
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AIIcon sx={{ fontSize: 32 }} />
                <Typography variant="h5" fontWeight={700}>
                  ResumeAI Pro
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Transforming careers with AI-powered resume optimization. Built with Google Gemini AI.
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" gutterBottom>
                    Product
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      Features
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      Pricing
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      API
                    </Typography>
                  </Stack>
                </Grid>
                                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" gutterBottom>
                    Company
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      About Us
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      Careers
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      Blog
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" gutterBottom>
                    Resources
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      Templates
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      Resume Guide
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      FAQ
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" gutterBottom>
                    Legal
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      Privacy Policy
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      Terms of Service
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                      Cookie Policy
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'grey.800' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © 2024 ResumeAI Pro. All rights reserved. Powered by Google Gemini AI.
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton sx={{ color: 'white', opacity: 0.6, '&:hover': { opacity: 1 } }}>
                <GlobalIcon />
              </IconButton>
              <IconButton sx={{ color: 'white', opacity: 0.6, '&:hover': { opacity: 1 } }}>
                <TeamIcon />
              </IconButton>
              <IconButton sx={{ color: 'white', opacity: 0.6, '&:hover': { opacity: 1 } }}>
                <SecurityIcon />
              </IconButton>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Floating Action Button */}
      <Fade in={scrolled}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1000,
          }}
        >
          <SignInButton mode="modal">
            <Button
              variant="contained"
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                boxShadow: 4,
                animation: `${pulse} 2s ease-in-out infinite`,
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: 8,
                },
              }}
            >
              <MagicIcon sx={{ fontSize: 28 }} />
            </Button>
          </SignInButton>
        </Box>
      </Fade>

      {/* Advanced Background Patterns */}
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hover-lift {
            transition: all 0.3s ease;
          }

          .hover-lift:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .shimmer {
            position: relative;
            overflow: hidden;
          }

          .shimmer::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            animation: shimmer 2s infinite;
          }

          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          .parallax {
            position: absolute;
            pointer-events: none;
          }

          .blob {
            border-radius: 50%;
            filter: blur(40px);
            opacity: 0.7;
            animation: blob 7s infinite;
          }

          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }

          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .card-hover:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }

          .text-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% 200%;
            animation: gradient 5s ease infinite;
          }

          .glow {
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
          }

          .pulse-border {
            position: relative;
          }

          .pulse-border::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: inherit;
            opacity: 0;
            animation: pulse-border 2s ease-in-out infinite;
          }

          @keyframes pulse-border {
            0%, 100% { opacity: 0; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }

          .feature-card {
            position: relative;
            overflow: hidden;
          }

          .feature-card::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              45deg,
              transparent 30%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 70%
            );
            transform: rotate(45deg);
            transition: all 0.5s;
            opacity: 0;
          }

          .feature-card:hover::after {
            animation: shine 0.5s ease-in-out;
          }

          @keyframes shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); opacity: 0; }
          }

          .morphing-shape {
            animation: morph 8s ease-in-out infinite;
          }

          @keyframes morph {
            0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
            100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          }

          .typewriter {
            overflow: hidden;
            border-right: .15em solid #667eea;
            white-space: nowrap;
            animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
          }

          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }

          @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #667eea; }
          }

          .parallax-container {
            position: relative;
            overflow: hidden;
          }

          .parallax-element {
            position: absolute;
            transition: transform 0.1s ease-out;
          }

          .noise-background {
            position: relative;
          }

          .noise-background::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.03;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
        `}
      </style>
    </Box>
  );
};

export default LandingPage;