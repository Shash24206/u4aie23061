import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import NotificationCard from './NotificationCard';

const NotificationList = ({ notifications, loading, isViewed, onMarkViewed }) => {
  if (loading) {
    return (
      <Box>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rectangular" height={100} sx={{ mb: 2, borderRadius: 1 }} />
        ))}
      </Box>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No notifications found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {notifications.map((n) => (
        <NotificationCard 
          key={n.id} 
          notification={n} 
          isViewed={isViewed(n.id)}
          onMarkViewed={onMarkViewed}
        />
      ))}
    </Box>
  );
};

export default NotificationList;
