import express from "express";
import cors from "cors";
import { Log } from "../../logging_middleware/src/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  await Log("backend", "info", "middleware", `${req.method} ${req.url}`);
  next();
});

app.get("/api/notifications", async (req, res) => {
  try {
    await Log("backend", "info", "api", "Fetching notifications from DB");
    
    const notifications = [
      { id: 1, message: "New comment on your post", read: false },
      { id: 2, message: "You have a new follower", read: true },
    ];

    res.json(notifications);
  } catch (error) {
    await Log("backend", "error", "api", `Failed to fetch notifications: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username } = req.body;
  await Log("backend", "info", "auth", `User login attempt: ${username}`);
  
  if (username === "admin") {
    await Log("backend", "info", "auth", `User logged in successfully: ${username}`);
    res.json({ success: true, token: "mock-token" });
  } else {
    await Log("backend", "warn", "auth", `Invalid login attempt: ${username}`);
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(PORT, async () => {
  await Log("backend", "info", "config", `Server started on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
});
