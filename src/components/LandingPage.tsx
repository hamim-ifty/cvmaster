import React, { useState } from 'react';
import { SignInButton, useAuth, useUser } from '@clerk/clerk-react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  useTheme,
  Tabs,
  Tab,
  TextField,
  Avatar,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  Description as ResumeIcon,
  CheckCircle as CheckIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  Home as HomeIcon,
  Comment as CommentIcon,
  Send as SendIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

// Tab Panel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Simple Comment Component
const SimpleCommentSection = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load comments when component mounts
  const loadComments = async () => {
    setIsLoadingComments(true);
    try {
      const response = await fetch('https://atc-v4nf.onrender.com/api/comments?limit=20');
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      } else {
        console.error('Failed to load comments');
      }
    } catch (err) {
      console.error('Error loading comments:', err);
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Load comments on component mount
  React.useEffect(() => {
    loadComments();
  }, []);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    // For authenticated users, use their Clerk info automatically
    let displayName, userId, userEmail;
    
    if (isSignedIn && user) {
      // Authenticated user - use Clerk data
      displayName = user.fullName || user.firstName || user.username || 'User';
      userId = user.id;
      userEmail = user.emailAddresses?.[0]?.emailAddress || '';
    } else {
      // Anonymous user - use provided name or default
      displayName = userName.trim() || 'Anonymous';
      userId = `guest_${Date.now()}`;
      userEmail = 'guest@example.com';
    }
    
    try {
      const response = await fetch('https://atc-v4nf.onrender.com/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          userName: displayName,
          userEmail: userEmail,
          content: newComment.trim(),
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNewComment('');
          if (!isSignedIn) {
            setUserName(''); // Only clear name for anonymous users
          }
          setSuccess('Comment posted successfully!');
          
          // Add the new comment to the local state
          const newCommentObj = {
            _id: data.comment._id || `temp_${Date.now()}`,
            userId: userId,
            userName: displayName,
            content: newComment.trim(),
            createdAt: new Date().toISOString(),
          };
          setComments([newCommentObj, ...comments]);
          setTimeout(() => setSuccess(''), 3000);
        } else {
          setError(data.error || 'Failed to post comment');
        }
      } else {
        setError('Failed to post comment. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Submit comment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor((now - commentDate) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return commentDate.toLocaleDateString();
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom fontWeight={600} sx={{ mb: 4 }}>
        What Our Users Say
      </Typography>

      {/* Success Alert */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Comment Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {isSignedIn && user 
                ? (user.fullName || user.firstName || user.username || 'U').charAt(0).toUpperCase()
                : (userName || 'A').charAt(0).toUpperCase()
              }
            </Avatar>
            <Box sx={{ flex: 1 }}>
              {/* Show user name for authenticated users */}
              {isSignedIn && user && (
                <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Posting as: {user.fullName || user.firstName || user.username || 'User'}
                </Typography>
              )}
              
              {/* Name input only for non-signed-in users */}
              {!isSignedIn && (
                <TextField
                  fullWidth
                  placeholder="Your name (optional)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              )}
              
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Share your thoughts about Smart Resume Analyzer..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {newComment.length}/1000 characters
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isLoading || newComment.length > 1000}
                >
                  {isLoading ? <CircularProgress size={20} /> : 'Post Comment'}
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Comments Display */}
      {isLoadingComments ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Loading comments...
          </Typography>
        </Box>
      ) : comments.length === 0 ? (
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CommentIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No comments yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Be the first to share your thoughts!
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {comments.length} Comment{comments.length !== 1 ? 's' : ''}
          </Typography>
          {comments.map((comment) => (
            <Card key={comment._id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {comment.userName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {comment.userName}
                      </Typography>
                      {user && user.id === comment.userId && (
                        <Chip 
                          label="You" 
                          size="small" 
                          color="primary" 
                          sx={{ ml: 1, height: 20 }}
                        />
                      )}
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        {formatTimeAgo(comment.createdAt)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.primary">
                      {comment.content}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

const LandingPage = () => {
  const theme = useTheme();
  const { isSignedIn } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  // Custom sign-in handler
  const handleSignIn = () => {
    document.querySelector('[data-clerk-sign-in-button]')?.click();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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

      {/* Main Content with Tabs */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="main navigation tabs"
            centered
          >
            <Tab 
              icon={<HomeIcon />} 
              label="Home" 
              iconPosition="start"
              sx={{ minHeight: 48 }}
            />
            <Tab 
              icon={<CommentIcon />} 
              label="Comments" 
              iconPosition="start"
              sx={{ minHeight: 48 }}
            />
          </Tabs>
        </Box>

        {/* Home Tab */}
        <TabPanel value={tabValue} index={0}>
          {/* Hero Section */}
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
        </TabPanel>

        {/* Comments Tab */}
        <TabPanel value={tabValue} index={1}>
          <SimpleCommentSection />
        </TabPanel>
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