import React from 'react';
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
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Mail as MailIcon,
  Description as ResumeIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  TipsAndUpdates as TipIcon,
  Download as DownloadIcon,
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
  onDownloadResume?: () => void;
  onDownloadCoverLetter?: () => void;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({
  resumeScore,
  selectedRole,
  resumeHistory,
  onReset,
  analysisResult,
  onDownloadResume,
  onDownloadCoverLetter,
}) => {
  if (resumeScore === null) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <Box>
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
            startIcon={<DownloadIcon />} 
            variant="contained"
            onClick={onDownloadResume}
          >
            Download Enhanced Resume
          </Button>
          <Button 
            startIcon={<MailIcon />} 
            variant="outlined"
            onClick={onDownloadCoverLetter}
          >
            Download Cover Letter
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