import axios from "axios";
import { Log } from "../../../logging_middleware/src/index.js";

const NOTIFICATION_API_URL = "http://20.207.122.201/evaluation-service/notifications";

export const fetchNotificationsFromAPI = async () => {
  try {
    await Log("backend", "info", "api", "Initiating notification fetch from external API");
    
    const response = await axios.get(NOTIFICATION_API_URL, { 
      timeout: 5000,
      headers: {
        "student-id": "AM.SC.U4AIE23061",
        "student-name": "U.Shashank"
      }
    });
    
    if (!response.data || !Array.isArray(response.data)) {
      await Log("backend", "error", "api", "Invalid response format from notification API");
      throw new Error("Invalid API response format");
    }

    await Log("backend", "info", "api", `Successfully fetched ${response.data.length} notifications`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response 
      ? `API error: ${error.response.status} - ${error.response.statusText}`
      : `Network error: ${error.message}`;
    
    await Log("backend", "error", "api", errorMessage);
    throw new Error(errorMessage);
  }
};
