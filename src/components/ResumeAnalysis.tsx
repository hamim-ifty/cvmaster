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
} from '@mui/material';
import {
  Edit as EditIcon,
  Mail as MailIcon,
  Description as ResumeIcon,
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
  }>;
  onReset: () => void;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({
  resumeScore,
  selectedRole,
  resumeHistory,
  onReset,
}) => {
  if (resumeScore === null) return null;

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
        </CardContent>
        <CardActions>
          <Button startIcon={<EditIcon />} variant="contained">
            Get Rewritten Resume
          </Button>
          <Button startIcon={<MailIcon />} variant="outlined">
            Generate Cover Letter
          </Button>
        </CardActions>
      </Card>

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
                  secondary={`Score: ${item.score}/100 • ${item.fileName}`}
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