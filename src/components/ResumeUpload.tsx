import React, { useState } from 'react';
import {
  Box,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Typography,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  CheckCircle as CheckIcon,
  Assessment as AssessmentIcon,
  TextFields as TextIcon,
  AttachFile as FileIcon,
} from '@mui/icons-material';

interface ResumeUploadProps {
  uploadedFile: File | null;
  selectedRole: string;
  isAnalyzing: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (role: string) => void;
  onAnalyze: () => void;
  jobRoles: string[];
  resumeText: string;
  onTextChange: (text: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({
  uploadedFile,
  selectedRole,
  isAnalyzing,
  onFileUpload,
  onRoleChange,
  onAnalyze,
  jobRoles,
  resumeText,
  onTextChange,
}) => {
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');

  const handleInputModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'text' | 'file' | null,
  ) => {
    if (newMode !== null) {
      setInputMode(newMode);
      // Clear previous inputs when switching modes
      if (newMode === 'text' && uploadedFile) {
        onFileUpload({ target: { files: null } } as any);
      } else if (newMode === 'file' && resumeText) {
        onTextChange('');
      }
    }
  };

  const hasContent = inputMode === 'text' ? resumeText.trim().length > 0 : uploadedFile !== null;

  return (
    <Box>
      {/* Input Mode Selection */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={inputMode}
          exclusive
          onChange={handleInputModeChange}
          aria-label="input mode"
          size="large"
        >
          <ToggleButton value="text" aria-label="text input">
            <TextIcon sx={{ mr: 1 }} />
            Paste Text
          </ToggleButton>
          <ToggleButton value="file" aria-label="file upload">
            <FileIcon sx={{ mr: 1 }} />
            Upload File
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Text Input Mode */}
      {inputMode === 'text' && (
        <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Paste your resume content below
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={10}
            placeholder="Paste your resume text here..."
            value={resumeText}
            onChange={(e) => onTextChange(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                fontFamily: 'monospace',
                fontSize: '0.9rem',
              },
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Tip: Copy and paste your entire resume content including work experience, skills, and education.
          </Typography>
        </Paper>
      )}

      {/* File Upload Mode */}
      {inputMode === 'file' && (
        <Box sx={{ mb: 4 }}>
          <input
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: 'none' }}
            id="resume-upload"
            type="file"
            onChange={onFileUpload}
          />
          <label htmlFor="resume-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadIcon />}
              size="large"
              fullWidth
              sx={{ py: 2 }}
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
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Supported formats: PDF, DOC, DOCX, TXT
          </Typography>
        </Box>
      )}

      {/* Role Selection Section */}
      {hasContent && (
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Target Job Role</InputLabel>
            <Select
              value={selectedRole}
              label="Target Job Role"
              onChange={(e) => onRoleChange(e.target.value)}
            >
              {jobRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Analyze Button */}
      {hasContent && (
        <Button
          variant="contained"
          onClick={onAnalyze}
          disabled={!selectedRole || isAnalyzing}
          startIcon={isAnalyzing ? <CircularProgress size={20} /> : <AssessmentIcon />}
          fullWidth
          size="large"
          sx={{ py: 1.5 }}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
        </Button>
      )}

      {/* Help Text */}
      {!hasContent && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            {inputMode === 'text' 
              ? 'Paste your resume content above to get started'
              : 'Upload your resume file to get started'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ResumeUpload;