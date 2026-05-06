import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import Link from 'next/link';
import { fetchNotifications } from '../services/notificationApi';
import { sortNotifications } from '../utils/priorityHelper';
import NotificationList from '../components/NotificationList';
import { useViewedNotifications } from '../hooks/useViewedNotifications';
import { Log } from '../../../logging_middleware/src/index.js';

export default function Home() {
  const [topNotifications, setTopNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isViewed, markAsViewed } = useViewedNotifications();

  useEffect(() => {
    const loadDashboard = async () => {
      await Log('frontend', 'info', 'page', 'Dashboard page mounted');
      try {
        const { notifications } = await fetchNotifications({ limit: 50 }); // Fetch more to sort client-side
        const sorted = sortNotifications(notifications).slice(0, 5); // Top 5
        setTopNotifications(sorted);
        await Log('frontend', 'info', 'state', 'Dashboard notifications updated');
      } catch (e) {
        await Log('frontend', 'error', 'page', `Dashboard load failed: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome, Shashank
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here are your top priority campus updates.
        </Typography>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Important Alerts</Typography>
          <Link href="/notifications" passHref>
            <Button size="small">View All</Button>
          </Link>
        </Box>
        
        <NotificationList 
          notifications={topNotifications} 
          loading={loading}
          isViewed={isViewed}
          onMarkViewed={markAsViewed}
        />
      </Paper>
    </Container>
  );
}
