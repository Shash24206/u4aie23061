import axios from 'axios';
import { Log } from '../../../logging_middleware/src/index.js';

const BASE_URL = 'http://20.207.122.201/evaluation-service/notifications';

export const fetchNotifications = async (params = {}) => {
  const { page = 1, limit = 10, type = '' } = params;
  
  try {
    await Log('frontend', 'info', 'api', `Fetching notifications (Page: ${page}, Limit: ${limit}, Type: ${type || 'All'})`);
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (type && type !== 'all') {
      queryParams.append('notification_type', type.toLowerCase());
    }

    const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`, { 
      timeout: 5000,
      headers: {
        "student-id": "AM.SC.U4AIE23061",
        "student-name": "U.Shashank"
      }
    });
    
    const data = response.data || [];
    const notifications = Array.isArray(data) ? data : (data.notifications || []);
    
    await Log('frontend', 'info', 'api', `Successfully fetched ${notifications.length} notifications`);
    
    return {
      notifications: notifications,
      total: data.total || notifications.length * 2
    };
  } catch (error) {
    const errorMsg = error.response ? `API Error ${error.response.status}` : `Network Error: ${error.message}`;
    await Log('frontend', 'error', 'api', `Fetch failed: ${errorMsg}`);
    
    console.warn('API links down, using fallback logic for development...');
    return { notifications: [], total: 0, error: errorMsg };
  }
};
