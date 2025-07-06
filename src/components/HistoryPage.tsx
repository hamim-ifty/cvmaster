import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
  InputAdornment,
  TablePagination,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Description as ResumeIcon,
  TextFields as TextIcon,
  AttachFile as FileIcon,
} from '@mui/icons-material';

interface HistoryItem {
  id: string;
  fileName: string;
  role: string;
  score: number;
  date: Date;
  inputType: 'text' | 'file';
  resumeContent?: string;
}

interface HistoryPageProps {
  resumeHistory: HistoryItem[];
  onDeleteItem: (id: string) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ resumeHistory, onDeleteItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Filter history based on search term
  const filteredHistory = resumeHistory.filter(
    (item) =>
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (item: HistoryItem) => {
    setSelectedItem(item);
    setViewDialogOpen(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Analysis History
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your resume analysis history
          </Typography>
        </Box>

        {/* Search and Filters */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search by file name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1, minWidth: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              disabled
            >
              Filters
            </Button>
          </Box>
        </Paper>

        {/* History Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Resume</TableCell>
                  <TableCell>Target Role</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                      <Box>
                        <ResumeIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          No analysis history yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Upload and analyze your first resume to see it here
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHistory
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>{formatDate(item.date)}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {item.inputType === 'text' ? <TextIcon /> : <FileIcon />}
                            <Typography variant="body2">{item.fileName}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${item.score}/100`}
                            color={getScoreColor(item.score)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={item.inputType === 'text' ? 'Text' : 'File'}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => handleViewDetails(item)}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download Report">
                            <IconButton size="small">
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => onDeleteItem(item.id)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {filteredHistory.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredHistory.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>

        {/* Stats Summary */}
        {resumeHistory.length > 0 && (
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Summary Statistics
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Analyses
                </Typography>
                <Typography variant="h4">{resumeHistory.length}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Average Score
                </Typography>
                <Typography variant="h4">
                  {Math.round(
                    resumeHistory.reduce((acc, item) => acc + item.score, 0) /
                      resumeHistory.length
                  )}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Best Score
                </Typography>
                <Typography variant="h4" color="success.main">
                  {Math.max(...resumeHistory.map((item) => item.score))}
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}

        {/* View Details Dialog */}
        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          {selectedItem && (
            <>
              <DialogTitle>Analysis Details</DialogTitle>
              <DialogContent>
                <Box sx={{ pt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Resume
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedItem.fileName}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                    Target Role
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedItem.role}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                    Score
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h3" color="primary">
                      {selectedItem.score}
                    </Typography>
                    <Rating value={selectedItem.score / 20} readOnly />
                  </Box>

                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                    Analysis Date
                  </Typography>
                  <Typography variant="body1">{formatDate(selectedItem.date)}</Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
                <Button variant="contained" startIcon={<DownloadIcon />}>
                  Download Report
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default HistoryPage;