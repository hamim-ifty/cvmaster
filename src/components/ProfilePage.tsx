import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Switch,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Assessment as AssessmentIcon,
  Star as StarIcon,
} from '@mui/icons-material';

interface ProfilePageProps {
  resumeHistory: Array<{
    id: string;
    score: number;
    role: string;
    date: Date;
  }>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ resumeHistory }) => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    phone: '',
    linkedin: '',
    bio: '',
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    weeklyReports: false,
    marketingEmails: false,
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, save to backend
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [field]: event.target.value });
  };

  const totalAnalyses = resumeHistory.length;
  const averageScore = totalAnalyses > 0
    ? Math.round(resumeHistory.reduce((acc, item) => acc + item.score, 0) / totalAnalyses)
    : 0;
  const bestScore = totalAnalyses > 0
    ? Math.max(...resumeHistory.map((item) => item.score))
    : 0;

  // Calculate member level based on usage
  const getMemberLevel = () => {
    if (totalAnalyses >= 20) return { level: 'Expert', color: 'error', progress: 100 };
    if (totalAnalyses >= 10) return { level: 'Advanced', color: 'warning', progress: 75 };
    if (totalAnalyses >= 5) return { level: 'Intermediate', color: 'info', progress: 50 };
    return { level: 'Beginner', color: 'success', progress: 25 };
  };

  const memberLevel = getMemberLevel();

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account settings and preferences
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Profile Information */}
          <Box sx={{ flex: '1 1 600px', minWidth: 0 }}>
            <Paper sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Profile Information</Typography>
                {!isEditing ? (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar
                  src={user?.imageUrl}
                  sx={{ width: 100, height: 100, mr: 3 }}
                >
                  {user?.firstName?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.primaryEmailAddress?.emailAddress}
                  </Typography>
                  <Chip 
                    label={memberLevel.level} 
                    color={memberLevel.color as any}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: '1 1 250px' }}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    value={profileData.jobTitle}
                    onChange={handleChange('jobTitle')}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 250px' }}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={profileData.company}
                    onChange={handleChange('company')}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 250px' }}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={profileData.location}
                    onChange={handleChange('location')}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 250px' }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profileData.phone}
                    onChange={handleChange('phone')}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 100%' }}>
                  <TextField
                    fullWidth
                    label="LinkedIn Profile"
                    value={profileData.linkedin}
                    onChange={handleChange('linkedin')}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LinkedInIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 100%' }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Bio"
                    value={profileData.bio}
                    onChange={handleChange('bio')}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                  />
                </Box>
              </Box>
            </Paper>

            {/* Preferences */}
            <Paper sx={{ p: 4, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notification Preferences
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive email updates about your analyses"
                  />
                  <Switch
                    checked={preferences.emailNotifications}
                    onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Weekly Reports"
                    secondary="Get weekly summary of your resume performance"
                  />
                  <Switch
                    checked={preferences.weeklyReports}
                    onChange={(e) => setPreferences({ ...preferences, weeklyReports: e.target.checked })}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Marketing Emails"
                    secondary="Receive tips and updates about new features"
                  />
                  <Switch
                    checked={preferences.marketingEmails}
                    onChange={(e) => setPreferences({ ...preferences, marketingEmails: e.target.checked })}
                  />
                </ListItem>
              </List>
            </Paper>
          </Box>

          {/* Stats and Activity */}
          <Box sx={{ flex: '0 1 400px', minWidth: 300 }}>
            {/* Member Level Card */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Member Level
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h4" color={`${memberLevel.color}.main`}>
                      {memberLevel.level}
                    </Typography>
                    <StarIcon color={memberLevel.color as any} />
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={memberLevel.progress} 
                    color={memberLevel.color as any}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Complete {20 - totalAnalyses} more analyses to reach Expert level
                </Typography>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your Statistics
                </Typography>
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Total Analyses" />
                    <Typography variant="h6">{totalAnalyses}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Average Score" />
                    <Typography variant="h6" color="primary">
                      {averageScore}/100
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Best Score" />
                    <Typography variant="h6" color="success.main">
                      {bestScore}/100
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Member Since" />
                    <Typography variant="body2">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Account Security
                </Typography>
                <List dense>
                  <ListItemButton sx={{ px: 0 }}>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Manage Security Settings"
                      secondary="Update password and 2FA"
                    />
                  </ListItemButton>
                </List>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => window.open('https://accounts.clerk.dev/user', '_blank')}
                >
                  Manage Account
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;