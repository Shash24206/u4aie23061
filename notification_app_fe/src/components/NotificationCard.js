import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Log } from '../../../logging_middleware/src/index.js';

const getPriorityColor = (type) => {
  switch (type.toLowerCase()) {
    case 'placement': return 'error';
    case 'result': return 'warning';
    case 'event': return 'info';
    default: return 'default';
  }
};

const NotificationCard = ({ notification, isViewed, onMarkViewed }) => {
  const { id, type, message, timestamp } = notification;

  const handleClick = async () => {
    if (!isViewed) {
      onMarkViewed(id);
      await Log('frontend', 'info', 'component', `Notification ${id} clicked and marked viewed`);
    }
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        backgroundColor: isViewed ? 'action.hover' : 'background.paper',
        borderLeft: isViewed ? 'none' : '5px solid #1976d2',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip 
            label={type.toUpperCase()} 
            size="small" 
            color={getPriorityColor(type)} 
            sx={{ fontWeight: 'bold' }}
          />
          <Typography variant="caption" color="text.secondary">
            {new Date(timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: isViewed ? 'normal' : 'bold',
            color: isViewed ? 'text.secondary' : 'text.primary'
          }}
        >
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
