import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar,
} from '@mui/material';
import { GridContainer, GridItem } from './GridReplacement';
import Header from './Header';
import Sidebar from './Sidebar';
import ResumeUpload from './ResumeUpload';
import ResumeAnalysis from './ResumeAnalysis';
import HistoryPage from './HistoryPage';
import ProfilePage from './ProfilePage';
import { apiService, AnalysisHistory } from '../services/api';

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
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'history' | 'profile'>('dashboard');
  const [selectedRole, setSelectedRole] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [resumeHistory, setResumeHistory] = useState<Array<{
    id: string;
    fileName: string;
    role: string;
    score: number;
    date: Date;
    inputType: 'text' | 'file';
  }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch analysis history on component mount
  useEffect(() => {
    if (user?.id) {
      fetchAnalysisHistory();
    }
  }, [user?.id]);

  const fetchAnalysisHistory = async () => {
    if (!user?.id) return;
    
    try {
      const history = await apiService.getAnalysisHistory(user.id);
      const formattedHistory = history.map(item => ({
        id: item._id,
        fileName: item.fileName,
        role: item.targetRole,
        score: item.score,
        date: new Date(item.createdAt),
        inputType: item.fileType,
      }));
      setResumeHistory(formattedHistory);
    } catch (error) {
      console.error('Failed to fetch analysis history:', error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setResumeText(''); // Clear text when file is uploaded
      setResumeScore(null);
      setAnalysisResult(null);
    }
  };

  const handleTextChange = (text: string) => {
    setResumeText(text);
    setUploadedFile(null); // Clear file when text is entered
    setResumeScore(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedRole || (!uploadedFile && !resumeText.trim()) || !user?.id) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      let result;
      
      if (uploadedFile) {
        result = await apiService.analyzeResumeFile(uploadedFile, selectedRole, user.id);
      } else {
        result = await apiService.analyzeResumeText(resumeText, selectedRole, user.id);
      }
      
      setResumeScore(result.score);
      setAnalysisResult(result);
      setSuccessMessage('Resume analyzed successfully!');
      
      // Refresh history
      await fetchAnalysisHistory();
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedRole('');
    setUploadedFile(null);
    setResumeText('');
    setResumeScore(null);
    setAnalysisResult(null);
  };

  const handleDeleteHistoryItem = async (id: string) => {
    try {
      await apiService.deleteAnalysis(id);
      setSuccessMessage('Analysis deleted successfully');
      await fetchAnalysisHistory();
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete analysis');
    }
  };

  const handleDownloadResume = async () => {
    if (!analysisResult?.analysisId) return;
    
    try {
      await apiService.downloadResume(analysisResult.analysisId);
      setSuccessMessage('Resume downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download resume');
    }
  };

  const handleDownloadCoverLetter = async () => {
    if (!analysisResult?.analysisId) return;
    
    try {
      await apiService.downloadCoverLetter(analysisResult.analysisId);
      setSuccessMessage('Cover letter downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download cover letter');
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'history':
        return (
          <HistoryPage 
            resumeHistory={resumeHistory} 
            onDeleteItem={handleDeleteHistoryItem}
          />
        );
      case 'profile':
        return <ProfilePage resumeHistory={resumeHistory} />;
      default:
        return (
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
            <GridContainer spacing={3}>
              <GridItem xs={12} md={8}>
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
                      analysisResult={analysisResult}
                      onDownloadResume={handleDownloadResume}
                      onDownloadCoverLetter={handleDownloadCoverLetter}
                    />
                  )}
                </Paper>
              </GridItem>

              {/* Sidebar */}
              <GridItem xs={12} md={4}>
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
              </GridItem>
            </GridContainer>
          </Container>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header 
        onMenuToggle={handleDrawerToggle} 
        drawerWidth={drawerWidth}
        currentPage={currentPage}
      />
      <Sidebar 
        mobileOpen={mobileOpen} 
        onDrawerToggle={handleDrawerToggle} 
        drawerWidth={drawerWidth}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
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
        {renderContent()}
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;