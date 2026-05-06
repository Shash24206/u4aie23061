import { compareTypes, compareTimestamps } from "../utils/priorityMapper.js";
import { Log } from "../../../logging_middleware/src/index.js";

export const processNotifications = async (notifications, topN = 10) => {
  try {
    await Log("backend", "info", "middleware", "Starting notification prioritization and sorting");

    if (!notifications || notifications.length === 0) {
      await Log("backend", "warn", "middleware", "Received empty notification list for processing");
      return [];
    }

    const sortedNotifications = [...notifications].sort((a, b) => {
      const typeComparison = compareTypes(a.type, b.type);
      if (typeComparison !== 0) {
        return typeComparison;
      }

      return compareTimestamps(a.timestamp, b.timestamp);
    });

    await Log("backend", "info", "middleware", "Prioritization and sorting completed successfully");

    const prioritized = sortedNotifications.slice(0, topN);
    await Log("backend", "info", "middleware", `Extracted top ${prioritized.length} notifications`);

    return prioritized;
  } catch (error) {
    await Log("backend", "error", "middleware", `Processing failed: ${error.message}`);
    throw error;
  }
};
