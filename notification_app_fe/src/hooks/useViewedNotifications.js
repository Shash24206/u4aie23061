import { useState, useEffect } from 'react';
import { Log } from '../../../logging_middleware/src/index.js';

export const useViewedNotifications = () => {
  const [viewedIds, setViewedIds] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('viewed_notifications');
    if (stored) {
      try {
        setViewedIds(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse viewed notifications');
      }
    }
  }, []);

  const markAsViewed = async (id) => {
    if (!viewedIds.includes(id)) {
      const updated = [...viewedIds, id];
      setViewedIds(updated);
      localStorage.setItem('viewed_notifications', JSON.stringify(updated));
      await Log('frontend', 'info', 'state', `Notification ${id} marked as viewed`);
    }
  };

  const isViewed = (id) => viewedIds.includes(id);

  return { isViewed, markAsViewed };
};
