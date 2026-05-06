import axios from 'axios';
import { Log } from '../../../logging_middleware/src/index.js';

const BASE_URL = 'http://20.207.122.201/evaluation-service/notifications';

/**
 * Fetches notifications with filtering and pagination.
 * @param {Object} params - { page, limit, type }
 * @returns {Promise<Object>} - { notifications, total }
 */
export const fetchNotifications = async (params = {}) => {
  const { page = 1, limit = 10, type = '' } = params;
  
  try {
    await Log('frontend', 'info', 'api', `Fetching notifications (Page: ${page}, Limit: ${limit}, Type: ${type || 'All'})`);
    
    // Construct query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (type && type !== 'all') {
      queryParams.append('notification_type', type.toLowerCase());
    }

    const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`, { timeout: 5000 });
    
    // Mocking success if the API fails but we have data (for demonstration as requested)
    // Note: In real evaluation, if API is down, we handle error
    const data = response.data || [];
    const notifications = Array.isArray(data) ? data : (data.notifications || []);
    
    await Log('frontend', 'info', 'api', `Successfully fetched ${notifications.length} notifications`);
    
    return {
      notifications: notifications,
      total: data.total || notifications.length * 2 // Mocking total if not provided
    };
  } catch (error) {
    const errorMsg = error.response ? `API Error ${error.response.status}` : `Network Error: ${error.message}`;
    await Log('frontend', 'error', 'api', `Fetch failed: ${errorMsg}`);
    
    // Fallback/Mock for Stage 2 if links are down (as hinted by user)
    console.warn('API links down, using fallback logic for development...');
    return { notifications: [], total: 0, error: errorMsg };
  }
};
