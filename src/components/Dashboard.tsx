import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Header from './Header';
import Sidebar from './Sidebar';
import ResumeUpload from './ResumeUpload';
import ResumeAnalysis from './ResumeAnalysis';

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

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeHistory, setResumeHistory] = useState<Array<{
    id: string;
    fileName: string;
    role: string;
    score: number;
    date: Date;
    inputType: 'text' | 'file';
  }>>([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setResumeText(''); // Clear text when file is uploaded
      setResumeScore(null);
    }
  };

  const handleTextChange = (text: string) => {
    setResumeText(text);
    setUploadedFile(null); // Clear file when text is entered
    setResumeScore(null);
  };

  const handleAnalyze = () => {
    if (!selectedRole || (!uploadedFile && !resumeText.trim())) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
      setResumeScore(mockScore);
      setIsAnalyzing(false);
      
      // Add to history
      const newEntry = {
        id: Date.now().toString(),
        fileName: uploadedFile ? uploadedFile.name : 'Pasted Resume',
        role: selectedRole,
        score: mockScore,
        date: new Date(),
        inputType: uploadedFile ? 'file' as const : 'text' as const,
      };
      setResumeHistory([newEntry, ...resumeHistory]);
    }, 2000); // Reduced time for text analysis
  };

  const handleReset = () => {
    setSelectedRole('');
    setUploadedFile(null);
    setResumeText('');
    setResumeScore(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header onMenuToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      <Sidebar 
        mobileOpen={mobileOpen} 
        onDrawerToggle={handleDrawerToggle} 
        drawerWidth={drawerWidth} 
      />

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

                {!resumeScore ? (
                  <ResumeUpload
                    uploadedFile={uploadedFile}
                    selectedRole={selectedRole}
                    isAnalyzing={isAnalyzing}
                    onFileUpload={handleFileUpload}
                    onRoleChange={setSelectedRole}
                    onAnalyze={handleAnalyze}
                    jobRoles={jobRoles}
                    resumeText={resumeText}
                    onTextChange={handleTextChange}
                  />
                ) : (
                  <ResumeAnalysis
                    resumeScore={resumeScore}
                    selectedRole={selectedRole}
                    resumeHistory={resumeHistory}
                    onReset={handleReset}
                  />
                )}
              </Paper>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
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
                  <ListItem>
                    <ListItemText 
                      primary="Update regularly"
                      secondary="Keep your resume current with latest achievements"
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