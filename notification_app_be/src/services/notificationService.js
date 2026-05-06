import { compareTypes, compareTimestamps } from "../utils/priorityMapper.js";
import { Log } from "../../../logging_middleware/src/index.js";

/**
 * Processes and prioritizes notifications.
 * @param {Array} notifications 
 * @param {number} topN 
 * @returns {Array}
 */
export const processNotifications = async (notifications, topN = 10) => {
  try {
    await Log("backend", "info", "middleware", "Starting notification prioritization and sorting");

    if (!notifications || notifications.length === 0) {
      await Log("backend", "warn", "middleware", "Received empty notification list for processing");
      return [];
    }

    // Sorting Logic: 
    // 1. Priority Type (Placement > Result > Event)
    // 2. Timestamp (Newer first)
    const sortedNotifications = [...notifications].sort((a, b) => {
      // Step 1: Compare by Type Priority
      const typeComparison = compareTypes(a.type, b.type);
      if (typeComparison !== 0) {
        return typeComparison;
      }

      // Step 2: Compare by Timestamp if types are the same
      return compareTimestamps(a.timestamp, b.timestamp);
    });

    await Log("backend", "info", "middleware", "Prioritization and sorting completed successfully");

    // Extract Top N
    const prioritized = sortedNotifications.slice(0, topN);
    await Log("backend", "info", "middleware", `Extracted top ${prioritized.length} notifications`);

    return prioritized;
  } catch (error) {
    await Log("backend", "error", "middleware", `Processing failed: ${error.message}`);
    throw error;
  }
};
