import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Rating,
  CardActions,
} from '@mui/material';
import {
  Menu as MenuIcon,
  CloudUpload as UploadIcon,
  Assessment as AssessmentIcon,
  Edit as EditIcon,
  Mail as MailIcon,
  Home as HomeIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Download as DownloadIcon,
  CheckCircle as CheckIcon,
  AutoAwesome as MagicIcon,
  Description as ResumeIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { useClerk } from '@clerk/clerk-react';

const drawerWidth = 240;

const jobRoles = [
  'Software Engineer',
  'Senior Developer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Scientist',
  'Product Manager',
  'UX Designer',
  'DevOps Engineer',
  'Mobile Developer',
  'Cloud Architect',
  'Business Analyst',
  'Project Manager',
  'Marketing Manager',
  'Sales Executive',
];

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeHistory, setResumeHistory] = useState<Array<{
    id: string;
    fileName: string;
    role: string;
    score: number;
    date: Date;
  }>>([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setActiveStep(1);
    }
  };

  const handleAnalyze = () => {
    if (!selectedRole || !uploadedFile) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
      setResumeScore(mockScore);
      setIsAnalyzing(false);
      setActiveStep(2);
      
      // Add to history
      const newEntry = {
        id: Date.now().toString(),
        fileName: uploadedFile.name,
        role: selectedRole,
        score: mockScore,
        date: new Date(),
      };
      setResumeHistory([newEntry, ...resumeHistory]);
    }, 3000);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedRole('');
    setUploadedFile(null);
    setResumeScore(null);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, active: true },
    { text: 'History', icon: <HistoryIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <MagicIcon />
          </Avatar>
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            Resume AI
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            sx={{
              bgcolor: item.active ? 'action.selected' : 'transparent',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ color: item.active ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => signOut()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Smart Resume Analyzer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          {/* Welcome Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Welcome back, {user?.firstName || 'User'}! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Upload your resume and get AI-powered insights to improve your career prospects.
            </Typography>
          </Box>

          {/* Main Analysis Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  Resume Analysis
                </Typography>

                <Stepper activeStep={activeStep} orientation="vertical">
                  <Step>
                    <StepLabel>Upload Your Resume</StepLabel>
                    <StepContent>
                      <Box sx={{ mt: 2, mb: 2 }}>
                        <input
                          accept=".pdf,.doc,.docx"
                          style={{ display: 'none' }}
                          id="resume-upload"
                          type="file"
                          onChange={handleFileUpload}
                        />
                        <label htmlFor="resume-upload">
                          <Button
                            variant="contained"
                            component="span"
                            startIcon={<UploadIcon />}
                            size="large"
                          >
                            Choose Resume File
                          </Button>
                        </label>
                        {uploadedFile && (
                          <Box sx={{ mt: 2 }}>
                            <Alert severity="success" icon={<CheckIcon />}>
                              File uploaded: {uploadedFile.name}
                            </Alert>
                          </Box>
                        )}
                      </Box>
                    </StepContent>
                  </Step>

                  <Step>
                    <StepLabel>Select Target Role</StepLabel>
                    <StepContent>
                      <Box sx={{ mt: 2, mb: 2 }}>
                        <FormControl fullWidth>
                          <InputLabel>Target Job Role</InputLabel>
                          <Select
                            value={selectedRole}
                            label="Target Job Role"
                            onChange={(e) => setSelectedRole(e.target.value)}
                          >
                            {jobRoles.map((role) => (
                              <MenuItem key={role} value={role}>
                                {role}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <Box sx={{ mt: 3 }}>
                          <Button
                            variant="contained"
                            onClick={handleAnalyze}
                            disabled={!selectedRole || isAnalyzing}
                            startIcon={isAnalyzing ? <CircularProgress size={20} /> : <AssessmentIcon />}
                          >
                            {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                          </Button>
                          <Button
                            sx={{ ml: 2 }}
                            onClick={() => setActiveStep(0)}
                          >
                            Back
                          </Button>
                        </Box>
                      </Box>
                    </StepContent>
                  </Step>

                  <Step>
                    <StepLabel>View Results</StepLabel>
                    <StepContent>
                      {resumeScore !== null && (
                        <Box sx={{ mt: 2 }}>
                          <Card sx={{ mb: 3 }}>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                Resume Score for {selectedRole}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h2" color="primary" sx={{ mr: 2 }}>
                                  {resumeScore}
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                  / 100
                                </Typography>
                              </Box>
                              <Rating value={resumeScore / 20} readOnly size="large" />
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                {resumeScore >= 80 ? 'Excellent match!' : resumeScore >= 60 ? 'Good match with room for improvement' : 'Consider enhancing your resume'}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button startIcon={<EditIcon />}>
                                Get Rewritten Resume
                              </Button>
                              <Button startIcon={<MailIcon />}>
                                Generate Cover Letter
                              </Button>
                            </CardActions>
                          </Card>
                          <Button variant="outlined" onClick={handleReset}>
                            Analyze Another Resume
                          </Button>
                        </Box>
                      )}
                    </StepContent>
                  </Step>
                </Stepper>
              </Paper>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              {/* Recent Analyses */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Analyses
                </Typography>
                {resumeHistory.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No analyses yet. Upload your first resume!
                  </Typography>
                ) : (
                  <List>
                    {resumeHistory.slice(0, 3).map((item) => (
                      <ListItem key={item.id} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <ResumeIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.role}
                          secondary={`Score: ${item.score}/100 • ${item.fileName}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>

              {/* Quick Tips */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Tips
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Use PDF format"
                      secondary="For best results, upload your resume in PDF format"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Include keywords"
                      secondary="Make sure your resume contains relevant industry keywords"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Keep it concise"
                      secondary="Aim for 1-2 pages for most roles"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;