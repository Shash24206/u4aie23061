import { fetchNotificationsFromAPI } from "./api/notificationApi.js";
import { processNotifications } from "./services/notificationService.js";
import { Log } from "../../logging_middleware/src/index.js";

const runStage1 = async () => {
  try {
    await Log("backend", "info", "config", "Stage 1 Application Started");
    console.log("--- Notification Prioritization System (Stage 1) ---");

    const rawNotifications = await fetchNotificationsFromAPI();

    const topNotifications = await processNotifications(rawNotifications, 5);

    console.log("\n--- Top Prioritized Notifications ---");
    if (topNotifications.length === 0) {
      console.log("No notifications to display.");
    } else {
      topNotifications.forEach((n, index) => {
        console.log(`${index + 1}. ${n.type.toUpperCase()} | ${n.message} | ${n.timestamp}`);
      });
    }

    await Log("backend", "info", "config", "Stage 1 Application Completed Successfully");
    console.log("\n--- Process Completed Successfully ---");

  } catch (error) {
    await Log("backend", "fatal", "config", `Application crashed: ${error.message}`);
    console.error("\n[FATAL ERROR]:", error.message);
    process.exit(1);
  }
};

runStage1();
