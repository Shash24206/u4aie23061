import axios from "axios";
import { VALID_STACKS, VALID_LEVELS, VALID_PACKAGES, EVALUATION_SERVER_URL } from "./config.js";

/**
 * Sends logs to the evaluation server.
 * @param {string} stack - "frontend" or "backend"
 * @param {string} level - "debug", "info", "warn", "error", "fatal"
 * @param {string} packageName - Package name (e.g., "api", "component", etc.)
 * @param {string} message - Meaningful log message
 */
export const Log = async (stack, level, packageName, message) => {
  try {
    // validation
    if (!VALID_STACKS.includes(stack)) {
      throw new Error(`Invalid stack value: ${stack}`);
    }

    if (!VALID_LEVELS.includes(level)) {
      throw new Error(`Invalid level value: ${level}`);
    }

    if (!VALID_PACKAGES.includes(packageName)) {
      throw new Error(`Invalid package value: ${packageName}`);
    }

    const payload = {
      stack,
      level,
      package: packageName,
      message,
    };

    const response = await axios.post(EVALUATION_SERVER_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Logging failed:", error.message);
    // Re-throw or handle as needed. Here we follow the recommended implementation.
  }
};
