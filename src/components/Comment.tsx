import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from '@mui/material';

// Very basic test component
const SimpleCommentTest = () => {
  const [comment, setComment] = useState('');

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Simple Comment Test
      </Typography>
      
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Type a test comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={() => console.log('Button clicked')}>
            Test Button
          </Button>
        </CardContent>
      </Card>
      
      <Typography variant="body1">
        If you can see this, the component is working!
      </Typography>
    </Box>
  );
};

export default SimpleCommentTest;