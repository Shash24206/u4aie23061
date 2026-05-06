import axios from "axios";
import { VALID_STACKS, VALID_LEVELS, VALID_PACKAGES, EVALUATION_SERVER_URL } from "./config.js";

export const Log = async (stack, level, packageName, message) => {
  try {
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
        "student-id": "AM.SC.U4AIE23061",
        "student-name": "U.Shashank"
      },
    });

    return response.data;
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
};
