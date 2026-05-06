import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Pagination, Divider } from '@mui/material';
import { fetchNotifications } from '../services/notificationApi';
import NotificationList from '../components/NotificationList';
import FilterBar from '../components/FilterBar';
import { useViewedNotifications } from '../hooks/useViewedNotifications';
import { Log } from '../../../logging_middleware/src/index.js';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const { isViewed, markAsViewed } = useViewedNotifications();

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      await Log('frontend', 'info', 'page', `Notifications page loaded (Filter: ${filter}, Page: ${page})`);
      
      try {
        const data = await fetchNotifications({ page, limit, type: filter });
        setNotifications(data.notifications);
        setTotal(data.total);
        await Log('frontend', 'info', 'state', `Loaded ${data.notifications.length} notifications`);
      } catch (e) {
        await Log('frontend', 'error', 'page', `Failed to load notifications: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, [filter, page]);

  const handlePageChange = async (event, value) => {
    setPage(value);
    await Log('frontend', 'info', 'state', `Pagination changed to page ${value}`);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        All Notifications
      </Typography>

      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />
      
      <Divider sx={{ mb: 3 }} />

      <NotificationList 
        notifications={notifications} 
        loading={loading}
        isViewed={isViewed}
        onMarkViewed={markAsViewed}
      />

      {total > limit && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination 
            count={Math.ceil(total / limit)} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}
    </Container>
  );
}
