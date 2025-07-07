import React, { useState, useCallback } from 'react';
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
  DragIndicator as DragIcon,
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
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);

  const handleInputModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'text' | 'file' | null,
  ) => {
    if (newMode !== null) {
      setInputMode(newMode);
      setDragError(null);
      // Clear previous inputs when switching modes
      if (newMode === 'text' && uploadedFile) {
        onFileUpload({ target: { files: null } } as any);
      } else if (newMode === 'file' && resumeText) {
        onTextChange('');
      }
    }
  };

  // Validate file type
  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
    
    const hasValidType = allowedTypes.includes(file.type);
    const hasValidExtension = allowedExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );
    
    return hasValidType || hasValidExtension;
  };

  // Handle file drop
  const handleFileDrop = useCallback((files: FileList) => {
    setDragError(null);
    
    if (files.length === 0) return;
    
    const file = files[0];
    
    // Validate file type
    if (!validateFile(file)) {
      setDragError('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setDragError('File size must be less than 10MB.');
      return;
    }
    
    // Create a mock event to reuse existing onFileUpload logic
    const mockEvent = {
      target: {
        files: files
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onFileUpload(mockEvent);
  }, [onFileUpload]);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set dragOver to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileDrop(files);
    }
  }, [handleFileDrop]);

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

      {/* File Upload Mode with Drag & Drop */}
      {inputMode === 'file' && (
        <Box sx={{ mb: 4 }}>
          {/* Drag & Drop Zone */}
          <Paper
            variant="outlined"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              p: 4,
              textAlign: 'center',
              border: isDragOver ? '2px dashed' : '2px dashed',
              borderColor: isDragOver ? 'primary.main' : 'grey.300',
              bgcolor: isDragOver ? 'primary.50' : 'background.paper',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'primary.50',
              },
            }}
          >
            {/* Hidden file input */}
            <input
              accept=".pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
              id="resume-upload"
              type="file"
              onChange={onFileUpload}
            />
            
            {/* Drop zone content */}
            <Box>
              {isDragOver ? (
                <>
                  <CheckIcon 
                    sx={{ 
                      fontSize: 48, 
                      color: 'primary.main',
                      mb: 2,
                      animation: 'pulse 1.5s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    }} 
                  />
                  <Typography variant="h6" color="primary.main" gutterBottom>
                    Drop your file here
                  </Typography>
                </>
              ) : (
                <>
                  <DragIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Drag & drop your resume here
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    or click to browse files
                  </Typography>
                  <label htmlFor="resume-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<UploadIcon />}
                      size="large"
                    >
                      Choose File
                    </Button>
                  </label>
                </>
              )}
            </Box>
          </Paper>

          {/* File upload success */}
          {uploadedFile && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="success" icon={<CheckIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {uploadedFile.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => onFileUpload({ target: { files: null } } as any)}
                    sx={{ ml: 2 }}
                  >
                    Remove
                  </Button>
                </Box>
              </Alert>
            </Box>
          )}

          {/* Error message */}
          {dragError && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error" onClose={() => setDragError(null)}>
                {dragError}
              </Alert>
            </Box>
          )}

          {/* Help text */}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
            Supported formats: PDF, DOC, DOCX, TXT • Maximum size: 10MB
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