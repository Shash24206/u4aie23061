# Logging Middleware

A reusable logging middleware for frontend and backend projects to send logs to a central evaluation server.

## Installation

```bash
cd logging_middleware
npm install
```

## Usage

### Frontend Example

```javascript
import { Log } from "logging_middleware/src";

await Log("frontend", "info", "api", "Fetching data...");
```

### Backend Example

```javascript
import { Log } from "logging_middleware/src";

await Log("backend", "error", "auth", "User login failed");
```

## Allowed Values

### Stack
- `frontend`
- `backend`

### Level
- `debug`
- `info`
- `warn`
- `error`
- `fatal`

### Package Names
- `api`
- `component`
- `hook`
- `page`
- `state`
- `style`
- `auth`
- `config`
- `middleware`
- `utils`
