import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import {
  Mail as MailIcon,
  Description as ResumeIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  TipsAndUpdates as TipIcon,
  Download as DownloadIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

interface ResumeAnalysisProps {
  resumeScore: number | null;
  selectedRole: string;
  resumeHistory: Array<{
    id: string;
    fileName: string;
    role: string;
    score: number;
    date: Date;
    inputType?: 'text' | 'file';
  }>;
  onReset: () => void;
  analysisResult?: any;
  analysisId?: string;
  error?: string | null;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({
  resumeScore,
  selectedRole,
  resumeHistory,
  onReset,
  analysisResult,
  analysisId,
  error,
}) => {
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [downloadingCover, setDownloadingCover] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Show error state
  if (error) {
    return (
      <Box>
        <Alert 
          severity="error" 
          icon={<ErrorIcon />}
          action={
            <Button color="inherit" size="small" onClick={onReset}>
              Try Again
            </Button>
          }
        >
          <Typography variant="h6" gutterBottom>Analysis Failed</Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Box>
    );
  }

  // Show loading state
  if (resumeScore === null && !error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>Analyzing your resume...</Typography>
        <Typography variant="body2" color="text.secondary">
          This may take a few moments
        </Typography>
        <LinearProgress sx={{ mt: 2, maxWidth: 300, mx: 'auto' }} />
      </Box>
    );
  }

  if (resumeScore === null) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  // Download functions with proper error handling
  const handleDownloadResume = async () => {
    if (!analysisId) {
      setDownloadError('No analysis ID available for download');
      return;
    }

    setDownloadingResume(true);
    setDownloadError(null);

    try {
      const response = await fetch(`https://atc-v4nf.onrender.com/api/download/resume/${analysisId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Download failed' }));
        throw new Error(errorData.error || 'Failed to download resume');
      }

      // Create download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${selectedRole.replace(/\s+/g, '-')}-enhanced.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download resume error:', error);
      setDownloadError(error instanceof Error ? error.message : 'Failed to download resume');
    } finally {
      setDownloadingResume(false);
    }
  };

  const handleDownloadCoverLetter = async () => {
    if (!analysisId) {
      setDownloadError('No analysis ID available for download');
      return;
    }

    setDownloadingCover(true);
    setDownloadError(null);

    try {
      const response = await fetch(`https://atc-v4nf.onrender.com/api/download/coverletter/${analysisId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Download failed' }));
        throw new Error(errorData.error || 'Failed to download cover letter');
      }

      // Create download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cover-letter-${selectedRole.replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download cover letter error:', error);
      setDownloadError(error instanceof Error ? error.message : 'Failed to download cover letter');
    } finally {
      setDownloadingCover(false);
    }
  };

  return (
    <Box>
      {/* Download Error */}
      {downloadError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setDownloadError(null)}>
          {downloadError}
        </Alert>
      )}

      {/* Score Card */}
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
            {resumeScore >= 80
              ? 'Excellent match! Your resume aligns well with the role.'
              : resumeScore >= 60
              ? 'Good match with room for improvement'
              : 'Consider enhancing your resume for better alignment'}
          </Typography>
          
          {analysisResult?.analysis?.atsScore && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                ATS Score: {analysisResult.analysis.atsScore}/100
              </Typography>
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Button 
            startIcon={downloadingResume ? <CircularProgress size={16} /> : <DownloadIcon />} 
            variant="contained"
            onClick={handleDownloadResume}
            disabled={downloadingResume || !analysisId}
          >
            {downloadingResume ? 'Downloading...' : 'Download Enhanced Resume'}
          </Button>
          <Button 
            startIcon={downloadingCover ? <CircularProgress size={16} /> : <MailIcon />} 
            variant="outlined"
            onClick={handleDownloadCoverLetter}
            disabled={downloadingCover || !analysisId}
          >
            {downloadingCover ? 'Downloading...' : 'Download Cover Letter'}
          </Button>
        </CardActions>
      </Card>

      {/* Analysis Details */}
      {analysisResult?.analysis && (
        <>
          {/* Strengths */}
          {analysisResult.analysis.strengths?.length > 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckIcon color="success" sx={{ mr: 1 }} />
                Strengths
              </Typography>
              <List dense>
                {analysisResult.analysis.strengths.map((strength: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={strength} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* Areas for Improvement */}
          {analysisResult.analysis.improvements?.length > 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon color="warning" sx={{ mr: 1 }} />
                Areas for Improvement
              </Typography>
              <List dense>
                {analysisResult.analysis.improvements.map((improvement: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <WarningIcon color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={improvement} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* Keywords */}
          {analysisResult.analysis.keywords?.length > 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Relevant Keywords
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {analysisResult.analysis.keywords.map((keyword: string, index: number) => (
                  <Chip
                    key={index}
                    label={keyword}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Paper>
          )}

          {/* Suggestions */}
          {analysisResult.analysis.suggestions?.length > 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TipIcon color="info" sx={{ mr: 1 }} />
                Actionable Suggestions
              </Typography>
              <List dense>
                {analysisResult.analysis.suggestions.map((suggestion: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <TipIcon color="info" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </>
      )}

      {/* Action Buttons */}
      <Button variant="outlined" onClick={onReset} fullWidth>
        Analyze Another Resume
      </Button>

      {/* History Section */}
      {resumeHistory.length > 0 && (
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Analyses
          </Typography>
          <List>
            {resumeHistory.slice(0, 3).map((item) => (
              <ListItem key={item.id} sx={{ px: 0 }}>
                <ListItemIcon>
                  <ResumeIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={item.role}
                  secondary={
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={`${item.score}/100`} 
                        size="small" 
                        color={getScoreColor(item.score) as any}
                      />
                      <Typography variant="caption" component="span">
                        {item.fileName}{item.inputType === 'text' ? ' (Text)' : ''}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ResumeAnalysis;